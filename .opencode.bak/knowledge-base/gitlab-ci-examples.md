---
title: GitLab CI Examples Knowledge Base
description: This knowledge base contains production-ready GitLab CI/CD patterns and examples for various deployment scenarios.
type: knowledge-base
category: cicd
version: 1.0.0
tags:
    - knowledge
    - cicd
    - gitlab
    - examples
last_updated: 2025-11-19
---

# GitLab CI Examples Knowledge Base

This knowledge base contains production-ready GitLab CI/CD patterns and examples for various deployment scenarios.

## Table of Contents

- [Basic Patterns](#basic-patterns)
- [Advanced Patterns](#advanced-patterns)
- [Multi-Environment Deployments](#multi-environment-deployments)
- [Docker & Container Patterns](#docker--container-patterns)
- [Kubernetes Deployments](#kubernetes-deployments)
- [Security Integration](#security-integration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Basic Patterns

### Simple Node.js Application Pipeline

```yaml
# Basic Node.js CI/CD pipeline
image: node:18

stages:
    - test
    - build
    - deploy

variables:
    NODE_ENV: production

cache:
    paths:
        - node_modules/

before_script:
    - npm ci --cache .npm --prefer-offline

test:
    stage: test
    script:
        - npm run lint
        - npm run test
    coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
    artifacts:
        reports:
            junit: junit.xml
            coverage_report:
                coverage_format: cobertura
                path: coverage/cobertura-coverage.xml

build:
    stage: build
    script:
        - npm run build
    artifacts:
        paths:
            - dist/
        expire_in: 1 hour
    only:
        - main
        - develop

deploy:
    stage: deploy
    script:
        - echo "Deploying application..."
        - npm run deploy
    environment:
        name: production
        url: https://myapp.com
    only:
        - main
```

### Python Application with Poetry

```yaml
image: python:3.11

stages:
    - test
    - build
    - deploy

variables:
    PIP_CACHE_DIR: '$CI_PROJECT_DIR/.cache/pip'
    POETRY_CACHE_DIR: '$CI_PROJECT_DIR/.cache/poetry'

cache:
    paths:
        - .cache/pip
        - .cache/poetry
        - .venv/

before_script:
    - pip install poetry
    - poetry config virtualenvs.in-project true
    - poetry install

test:
    stage: test
    script:
        - poetry run pytest --cov=src --cov-report=xml --cov-report=term
        - poetry run black --check src/
        - poetry run flake8 src/
    coverage: '/TOTAL.*\s+(\d+%)$/'
    artifacts:
        reports:
            coverage_report:
                coverage_format: cobertura
                path: coverage.xml

build:
    stage: build
    script:
        - poetry build
    artifacts:
        paths:
            - dist/
        expire_in: 1 week

deploy:
    stage: deploy
    script:
        - poetry publish --username $PYPI_USERNAME --password $PYPI_PASSWORD
    only:
        - tags
```

## Advanced Patterns

### Monorepo with Selective Building

```yaml
# Monorepo pipeline with path-based triggers
workflow:
    rules:
        - if: $CI_COMMIT_BRANCH == "main"
        - if: $CI_COMMIT_BRANCH == "develop"
        - if: $CI_PIPELINE_SOURCE == "merge_request_event"

variables:
    DOCKER_DRIVER: overlay2
    DOCKER_TLS_CERTDIR: '/certs'

stages:
    - detect-changes
    - test
    - build
    - deploy

# Detect which services changed
detect-changes:
    stage: detect-changes
    image: alpine/git
    script:
        - |
            if [ "$CI_COMMIT_BEFORE_SHA" = "0000000000000000000000000000000000000000" ]; then
              echo "api=true" > changes.env
              echo "frontend=true" >> changes.env
              echo "worker=true" >> changes.env
            else
              git diff --name-only $CI_COMMIT_BEFORE_SHA $CI_COMMIT_SHA > changed_files.txt
              
              if grep -q "^api/" changed_files.txt; then
                echo "api=true" > changes.env
              else
                echo "api=false" > changes.env
              fi
              
              if grep -q "^frontend/" changed_files.txt; then
                echo "frontend=true" >> changes.env
              else
                echo "frontend=false" >> changes.env
              fi
              
              if grep -q "^worker/" changed_files.txt; then
                echo "worker=true" >> changes.env
              else
                echo "worker=false" >> changes.env
              fi
            fi
    artifacts:
        reports:
            dotenv: changes.env

# API Service
test:api:
    stage: test
    image: node:18
    rules:
        - if: $api == "true"
    script:
        - cd api
        - npm ci
        - npm run test
    cache:
        key: api-dependencies
        paths:
            - api/node_modules/

build:api:
    stage: build
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    rules:
        - if: $api == "true"
    before_script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
    script:
        - cd api
        - docker build -t $CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHA .
        - docker push $CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHA

deploy:api:
    stage: deploy
    image: bitnami/kubectl
    rules:
        - if: $api == "true" && $CI_COMMIT_BRANCH == "main"
    script:
        - kubectl set image deployment/api api=$CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHA
        - kubectl rollout status deployment/api

# Frontend Service
test:frontend:
    stage: test
    image: node:18
    rules:
        - if: $frontend == "true"
    script:
        - cd frontend
        - npm ci
        - npm run test
        - npm run build
    cache:
        key: frontend-dependencies
        paths:
            - frontend/node_modules/

build:frontend:
    stage: build
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    rules:
        - if: $frontend == "true"
    before_script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
    script:
        - cd frontend
        - docker build -t $CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA .
        - docker push $CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA

deploy:frontend:
    stage: deploy
    image: bitnami/kubectl
    rules:
        - if: $frontend == "true" && $CI_COMMIT_BRANCH == "main"
    script:
        - kubectl set image deployment/frontend frontend=$CI_REGISTRY_IMAGE/frontend:$CI_COMMIT_SHA
        - kubectl rollout status deployment/frontend
```

### Dynamic Child Pipelines

```yaml
# Parent pipeline that generates child pipelines
stages:
    - generate
    - trigger

generate-pipeline:
    stage: generate
    image: python:3.11
    script:
        - |
            python3 << 'EOF'
            import yaml
            import os

            services = ['api', 'frontend', 'worker']
            pipeline = {
                'stages': ['build', 'test', 'deploy'],
                'variables': {'DOCKER_DRIVER': 'overlay2'}
            }

            for service in services:
                # Build job
                pipeline[f'build:{service}'] = {
                    'stage': 'build',
                    'image': 'docker:24.0.5',
                    'services': ['docker:24.0.5-dind'],
                    'script': [
                        f'cd {service}',
                        f'docker build -t $CI_REGISTRY_IMAGE/{service}:$CI_COMMIT_SHA .',
                        f'docker push $CI_REGISTRY_IMAGE/{service}:$CI_COMMIT_SHA'
                    ]
                }
                
                # Test job
                pipeline[f'test:{service}'] = {
                    'stage': 'test',
                    'image': 'node:18',
                    'script': [
                        f'cd {service}',
                        'npm ci',
                        'npm run test'
                    ]
                }
                
                # Deploy job
                pipeline[f'deploy:{service}'] = {
                    'stage': 'deploy',
                    'image': 'bitnami/kubectl',
                    'script': [
                        f'kubectl set image deployment/{service} {service}=$CI_REGISTRY_IMAGE/{service}:$CI_COMMIT_SHA'
                    ],
                    'only': ['main']
                }

            with open('generated-pipeline.yml', 'w') as f:
                yaml.dump(pipeline, f, default_flow_style=False)
            EOF
    artifacts:
        paths:
            - generated-pipeline.yml

trigger-child-pipeline:
    stage: trigger
    trigger:
        include:
            - artifact: generated-pipeline.yml
              job: generate-pipeline
        strategy: depend
```

## Multi-Environment Deployments

### Environment-Specific Deployments

```yaml
stages:
    - build
    - test
    - deploy-dev
    - deploy-staging
    - deploy-production

variables:
    DOCKER_REGISTRY: $CI_REGISTRY
    IMAGE_TAG: $CI_COMMIT_SHA

build:
    stage: build
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    before_script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
    script:
        - docker build -t $DOCKER_REGISTRY/$CI_PROJECT_PATH:$IMAGE_TAG .
        - docker push $DOCKER_REGISTRY/$CI_PROJECT_PATH:$IMAGE_TAG

test:
    stage: test
    image: $DOCKER_REGISTRY/$CI_PROJECT_PATH:$IMAGE_TAG
    script:
        - npm run test:unit
        - npm run test:integration

# Development Environment
deploy:dev:
    stage: deploy-dev
    image: bitnami/kubectl
    environment:
        name: development
        url: https://dev.myapp.com
    script:
        - kubectl config use-context dev-cluster
        - helm upgrade --install myapp ./helm-chart --namespace development --set image.tag=$IMAGE_TAG --set
          environment=development --set replicas=1 --set resources.requests.memory=256Mi
    only:
        - develop

# Staging Environment
deploy:staging:
    stage: deploy-staging
    image: bitnami/kubectl
    environment:
        name: staging
        url: https://staging.myapp.com
    script:
        - kubectl config use-context staging-cluster
        - helm upgrade --install myapp ./helm-chart --namespace staging --set image.tag=$IMAGE_TAG --set environment=staging
          --set replicas=2 --set resources.requests.memory=512Mi
    only:
        - main

# Production Environment with Manual Approval
deploy:production:
    stage: deploy-production
    image: bitnami/kubectl
    environment:
        name: production
        url: https://myapp.com
    script:
        - kubectl config use-context prod-cluster
        - helm upgrade --install myapp ./helm-chart --namespace production --set image.tag=$IMAGE_TAG --set
          environment=production --set replicas=5 --set resources.requests.memory=1Gi --set autoscaling.enabled=true
    when: manual
    only:
        - main
```

### Blue-Green Deployment Pattern

```yaml
stages:
    - build
    - deploy-blue
    - test-blue
    - switch-traffic
    - cleanup-green

variables:
    CURRENT_SLOT: green
    NEW_SLOT: blue

build:
    stage: build
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    script:
        - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
        - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

# Deploy to blue environment
deploy:blue:
    stage: deploy-blue
    image: bitnami/kubectl
    script:
        - |
            # Deploy to blue slot
            helm upgrade --install myapp-blue ./helm-chart \
              --namespace production \
              --set image.tag=$CI_COMMIT_SHA \
              --set service.name=myapp-blue \
              --set ingress.enabled=false

            # Wait for deployment to be ready
            kubectl wait --for=condition=available --timeout=300s deployment/myapp-blue
    environment:
        name: production-blue
        url: https://blue.myapp.com

# Test blue environment
test:blue:
    stage: test-blue
    image: curlimages/curl
    script:
        - |
            # Health check
            curl -f https://blue.myapp.com/health || exit 1

            # Smoke tests
            curl -f https://blue.myapp.com/api/version || exit 1

            # Load testing
            for i in {1..10}; do
              curl -f https://blue.myapp.com/api/status || exit 1
            done

# Switch traffic to blue
switch:traffic:
    stage: switch-traffic
    image: bitnami/kubectl
    when: manual
    script:
        - |
            # Update ingress to point to blue
            kubectl patch ingress myapp-ingress -p '{"spec":{"rules":[{"host":"myapp.com","http":{"paths":[{"path":"/","pathType":"Prefix","backend":{"service":{"name":"myapp-blue","port":{"number":80}}}}]}}]}}'

            # Wait for ingress to update
            sleep 30

            # Verify traffic is going to blue
            curl -f https://myapp.com/health || exit 1
    environment:
        name: production
        url: https://myapp.com

# Cleanup old green deployment
cleanup:green:
    stage: cleanup-green
    image: bitnami/kubectl
    script:
        - |
            # Scale down green deployment
            kubectl scale deployment myapp-green --replicas=0

            # Optionally delete green resources after some time
            # kubectl delete deployment myapp-green
            # kubectl delete service myapp-green
    when: manual
    allow_failure: true
```

## Docker & Container Patterns

### Multi-Stage Docker Build with Caching

```yaml
build:
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    variables:
        DOCKER_BUILDKIT: 1
    before_script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
    script:
        - |
            # Build with cache mounts and registry cache
            docker build \
              --cache-from $CI_REGISTRY_IMAGE:cache-deps \
              --cache-from $CI_REGISTRY_IMAGE:cache-build \
              --cache-from $CI_REGISTRY_IMAGE:latest \
              --target production \
              --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA \
              --tag $CI_REGISTRY_IMAGE:latest \
              .

            # Push dependency cache layer
            docker build \
              --target dependencies \
              --tag $CI_REGISTRY_IMAGE:cache-deps \
              .
            docker push $CI_REGISTRY_IMAGE:cache-deps

            # Push build cache layer
            docker build \
              --target build \
              --tag $CI_REGISTRY_IMAGE:cache-build \
              .
            docker push $CI_REGISTRY_IMAGE:cache-build

            # Push final images
            docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
            docker push $CI_REGISTRY_IMAGE:latest
```

### Container Security Scanning

```yaml
security:container:
    stage: security
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    before_script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
    script:
        - |
            # Pull the built image
            docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

            # Install Trivy
            apk add --no-cache curl
            curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

            # Scan for vulnerabilities
            trivy image --exit-code 1 --severity HIGH,CRITICAL $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

            # Generate SARIF report
            trivy image --format sarif --output trivy-report.sarif $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    artifacts:
        reports:
            sast: trivy-report.sarif
    allow_failure: false
```

## Kubernetes Deployments

### Advanced Kubernetes Deployment

```yaml
deploy:k8s:
    stage: deploy
    image: bitnami/kubectl
    variables:
        NAMESPACE: production
        APP_NAME: myapp
    before_script:
        - kubectl version --client
        - kubectl config current-context
    script:
        - |
            # Create namespace if it doesn't exist
            kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

            # Apply ConfigMap
            kubectl create configmap $APP_NAME-config \
              --from-literal=DATABASE_URL=$DATABASE_URL \
              --from-literal=REDIS_URL=$REDIS_URL \
              --namespace=$NAMESPACE \
              --dry-run=client -o yaml | kubectl apply -f -

            # Apply Secret
            kubectl create secret generic $APP_NAME-secret \
              --from-literal=JWT_SECRET=$JWT_SECRET \
              --from-literal=API_KEY=$API_KEY \
              --namespace=$NAMESPACE \
              --dry-run=client -o yaml | kubectl apply -f -

            # Deploy application
            envsubst < k8s/deployment.yaml | kubectl apply -f -
            envsubst < k8s/service.yaml | kubectl apply -f -
            envsubst < k8s/ingress.yaml | kubectl apply -f -

            # Wait for rollout to complete
            kubectl rollout status deployment/$APP_NAME --namespace=$NAMESPACE --timeout=300s

            # Verify deployment
            kubectl get pods -l app=$APP_NAME --namespace=$NAMESPACE
            kubectl get service $APP_NAME --namespace=$NAMESPACE
    environment:
        name: production
        kubernetes:
            namespace: production
```

### Helm Chart Deployment

```yaml
deploy:helm:
    stage: deploy
    image: alpine/helm:3.12.0
    variables:
        CHART_VERSION: '1.0.0'
        RELEASE_NAME: myapp
        NAMESPACE: production
    before_script:
        - helm version
        - helm repo add stable https://charts.helm.sh/stable
        - helm repo update
    script:
        - |
            # Package the chart
            helm package ./helm-chart --version $CHART_VERSION

            # Deploy with Helm
            helm upgrade --install $RELEASE_NAME ./helm-chart \
              --namespace $NAMESPACE \
              --create-namespace \
              --set image.tag=$CI_COMMIT_SHA \
              --set image.repository=$CI_REGISTRY_IMAGE \
              --set environment=$CI_ENVIRONMENT_NAME \
              --set ingress.hosts[0].host=$CI_ENVIRONMENT_URL \
              --set resources.requests.memory=512Mi \
              --set resources.limits.memory=1Gi \
              --set autoscaling.enabled=true \
              --set autoscaling.minReplicas=2 \
              --set autoscaling.maxReplicas=10 \
              --wait --timeout=10m

            # Verify deployment
            helm status $RELEASE_NAME --namespace $NAMESPACE
            helm test $RELEASE_NAME --namespace $NAMESPACE
    environment:
        name: production
        kubernetes:
            namespace: production
```

## Security Integration

### Comprehensive Security Pipeline

```yaml
stages:
    - security-scan
    - build
    - security-test
    - deploy

# SAST - Static Application Security Testing
sast:
    stage: security-scan
    image: returntocorp/semgrep
    script:
        - semgrep --config=auto --json --output=sast-report.json .
    artifacts:
        reports:
            sast: sast-report.json
    allow_failure: false

# Secret Scanning
secrets:
    stage: security-scan
    image: trufflesecurity/trufflehog:latest
    script:
        - trufflehog git file://. --json > secrets-report.json
    artifacts:
        paths:
            - secrets-report.json
    allow_failure: false

# Dependency Scanning
dependency_scanning:
    stage: security-scan
    image: owasp/dependency-check
    script:
        - |
            /usr/share/dependency-check/bin/dependency-check.sh \
              --project "$CI_PROJECT_NAME" \
              --scan . \
              --format JSON \
              --out dependency-check-report.json
    artifacts:
        reports:
            dependency_scanning: dependency-check-report.json

# License Scanning
license_scanning:
    stage: security-scan
    image: licensefinder/license_finder
    script:
        - license_finder report --format json > licenses-report.json
    artifacts:
        paths:
            - licenses-report.json

# Infrastructure Security
infrastructure_security:
    stage: security-scan
    image: bridgecrew/checkov
    script:
        - checkov -f Dockerfile --framework dockerfile --output json > dockerfile-security.json
        - checkov -d k8s/ --framework kubernetes --output json > k8s-security.json
    artifacts:
        paths:
            - dockerfile-security.json
            - k8s-security.json
    allow_failure: true

# Build stage (from previous examples)
build:
    stage: build
    # ... build configuration

# Dynamic Application Security Testing
dast:
    stage: security-test
    image: owasp/zap2docker-stable
    variables:
        website: 'https://staging.myapp.com'
    script:
        - |
            zap-baseline.py -t $website -J zap-report.json || true
            zap-api-scan.py -t $website/api/openapi.json -f openapi -J zap-api-report.json || true
    artifacts:
        paths:
            - zap-report.json
            - zap-api-report.json
    only:
        - main
        - develop

# Security Report Generation
security_report:
    stage: security-test
    image: alpine:latest
    needs:
        - sast
        - secrets
        - dependency_scanning
        - license_scanning
        - infrastructure_security
        - dast
    script:
        - |
            apk add --no-cache jq

            echo "# Security Scan Report" > security-report.md
            echo "Generated: $(date)" >> security-report.md
            echo "" >> security-report.md

            # Process SAST findings
            if [ -f sast-report.json ]; then
              echo "## SAST Findings" >> security-report.md
              jq -r '.results[] | "- " + .check_id + ": " + .message' sast-report.json >> security-report.md
            fi

            # Process other reports...
            cat security-report.md
    artifacts:
        paths:
            - security-report.md
    allow_failure: true
```

## Performance Optimization

### Parallel Job Execution

```yaml
stages:
    - test
    - build
    - deploy

# Parallel testing
test:unit:
    stage: test
    image: node:18
    script:
        - npm ci
        - npm run test:unit
    cache:
        key: node-modules-$CI_COMMIT_REF_SLUG
        paths:
            - node_modules/

test:integration:
    stage: test
    image: node:18
    services:
        - postgres:13
        - redis:6
    variables:
        DATABASE_URL: postgres://test:test@postgres:5432/testdb
        REDIS_URL: redis://redis:6379
    script:
        - npm ci
        - npm run test:integration
    cache:
        key: node-modules-$CI_COMMIT_REF_SLUG
        paths:
            - node_modules/

test:e2e:
    stage: test
    image: cypress/included:12.0.0
    script:
        - npm ci
        - npm run test:e2e
    cache:
        key: node-modules-$CI_COMMIT_REF_SLUG
        paths:
            - node_modules/
    artifacts:
        when: always
        paths:
            - cypress/videos/
            - cypress/screenshots/
        expire_in: 1 week

# Parallel builds for different architectures
build:amd64:
    stage: build
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    variables:
        DOCKER_BUILDKIT: 1
    script:
        - docker build --platform linux/amd64 -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-amd64 .
        - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-amd64

build:arm64:
    stage: build
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    variables:
        DOCKER_BUILDKIT: 1
    script:
        - docker build --platform linux/arm64 -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-arm64 .
        - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-arm64

# Create multi-arch manifest
manifest:
    stage: build
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    needs:
        - build:amd64
        - build:arm64
    script:
        - |
            docker manifest create $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA \
              $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-amd64 \
              $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-arm64
            docker manifest annotate $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-arm64 --arch arm64
            docker manifest push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

### Optimized Caching Strategy

```yaml
variables:
    DOCKER_DRIVER: overlay2
    PIP_CACHE_DIR: '$CI_PROJECT_DIR/.cache/pip'
    NPM_CONFIG_CACHE: '$CI_PROJECT_DIR/.cache/npm'

# Global cache configuration
cache: &global_cache
    key:
        files:
            - package-lock.json
            - requirements.txt
            - poetry.lock
    paths:
        - .cache/
        - node_modules/
        - .venv/

test:frontend:
    image: node:18
    cache:
        <<: *global_cache
        key: frontend-$CI_COMMIT_REF_SLUG
        paths:
            - frontend/node_modules/
            - .cache/npm
    script:
        - cd frontend
        - npm ci --cache ../.cache/npm --prefer-offline
        - npm run test

test:backend:
    image: python:3.11
    cache:
        <<: *global_cache
        key: backend-$CI_COMMIT_REF_SLUG
        paths:
            - .venv/
            - .cache/pip
    script:
        - python -m venv .venv
        - source .venv/bin/activate
        - pip install --cache-dir .cache/pip -r requirements.txt
        - pytest

# Docker layer caching
build:
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    variables:
        DOCKER_BUILDKIT: 1
    before_script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
    script:
        - |
            docker build \
              --cache-from $CI_REGISTRY_IMAGE:cache \
              --build-arg BUILDKIT_INLINE_CACHE=1 \
              --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA \
              --tag $CI_REGISTRY_IMAGE:cache \
              .
            docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
            docker push $CI_REGISTRY_IMAGE:cache
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Pipeline Timeout Issues

```yaml
# Increase timeout for long-running jobs
build:
    script:
        - echo "Long running build process..."
    timeout: 2h # Set custom timeout

# For Docker builds, use buildkit for better performance
build:docker:
    variables:
        DOCKER_BUILDKIT: 1
    script:
        - docker build --progress=plain .
```

#### 2. Memory and Resource Issues

```yaml
# Specify resource requirements
test:memory-intensive:
    tags:
        - large-runner # Use runners with more memory
    variables:
        NODE_OPTIONS: '--max-old-space-size=4096'
    script:
        - npm run test:memory-intensive
```

#### 3. Network and Connectivity Issues

```yaml
# Retry failed jobs
deploy:
    retry:
        max: 3
        when:
            - runner_system_failure
            - stuck_or_timeout_failure
            - scheduler_failure
    script:
        - kubectl apply -f k8s/

# Add timeout to network operations
test:api:
    script:
        - timeout 300 curl https://api.example.com/health
```

#### 4. Debugging Pipeline Issues

```yaml
# Enable debug mode
debug:pipeline:
    variables:
        CI_DEBUG_TRACE: 'true'
    script:
        - set -x # Enable bash debug mode
        - echo "Debug information..."
        - env | sort # Show all environment variables
        - df -h # Show disk usage
        - free -m # Show memory usage

# Collect artifacts for debugging
debug:artifacts:
    script:
        - echo "Build failed, collecting debug info..."
        - docker logs $(docker ps -aq) > docker-logs.txt || true
        - kubectl describe pods > k8s-pods.txt || true
    artifacts:
        when: on_failure
        paths:
            - docker-logs.txt
            - k8s-pods.txt
        expire_in: 1 week
```

#### 5. Cache Problems

```yaml
# Clear cache when needed
clear:cache:
    stage: build
    script:
        - echo "Clearing cache..."
    cache:
        key: '$CI_COMMIT_REF_SLUG'
        paths: [] # Empty cache paths to clear
    when: manual
```

### Pipeline Performance Tips

1. **Use specific Docker images**: Instead of `ubuntu:latest`, use `ubuntu:20.04` for consistency
2. **Minimize artifact sizes**: Only include necessary files in artifacts
3. **Use parallel jobs**: Split work across multiple jobs when possible
4. **Optimize Docker builds**: Use multi-stage builds and .dockerignore
5. **Cache dependencies**: Cache node_modules, pip cache, etc.
6. **Use rules effectively**: Avoid running unnecessary jobs
7. **Set appropriate timeouts**: Don't let jobs run forever
8. **Monitor resource usage**: Use appropriate runner sizes

This knowledge base provides comprehensive examples for GitLab CI/CD patterns that can be adapted for various project
needs.
