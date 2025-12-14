---
title: Pipeline Best Practices Knowledge Base
description: Comprehensive guide to CI/CD pipeline best practices across all major platforms, focusing on security, performance, maintainability, and reliability.
type: knowledge-base
category: cicd
version: 1.0.0
tags:
    - knowledge
    - cicd
    - pipeline
    - best
    - practices
last_updated: 2025-11-19
---

# Pipeline Best Practices Knowledge Base

Comprehensive guide to CI/CD pipeline best practices across all major platforms, focusing on security, performance,
maintainability, and reliability.

## Table of Contents

- [Universal Best Practices](#universal-best-practices)
- [Security Best Practices](#security-best-practices)
- [Performance Optimization](#performance-optimization)
- [Pipeline Design Patterns](#pipeline-design-patterns)
- [Testing Strategies](#testing-strategies)
- [Deployment Strategies](#deployment-strategies)
- [Monitoring and Observability](#monitoring-and-observability)
- [Infrastructure as Code](#infrastructure-as-code)
- [Troubleshooting and Debugging](#troubleshooting-and-debugging)
- [Platform-Specific Practices](#platform-specific-practices)

## Universal Best Practices

### 1. Pipeline Structure and Organization

#### Keep Pipelines Simple and Readable

```yaml
# Good: Clear, simple structure
stages:
  - validate
  - build
  - test
  - security
  - deploy

# Bad: Overly complex, unclear stages
stages:
  - pre-build-validation-and-setup
  - build-compile-test-analyze-package
  - post-build-security-quality-checks
```

#### Use Descriptive Names

```yaml
# Good: Descriptive job names
test:unit-tests:
    script: npm run test:unit

test:integration-tests:
    script: npm run test:integration

# Bad: Generic names
test1:
    script: npm run test:unit

test2:
    script: npm run test:integration
```

#### Implement Proper Stage Dependencies

```yaml
# Good: Clear dependencies
stages:
    - build
    - test
    - security
    - deploy

test:
    stage: test
    needs: [build] # Explicit dependency

deploy:
    stage: deploy
    needs: [test, security] # Multiple dependencies
```

### 2. Configuration Management

#### Use Environment Variables and Secrets

```yaml
# Good: Externalized configuration
variables:
    NODE_ENV: production
    APP_VERSION: ${CI_COMMIT_TAG:-latest}

deploy:
    script:
        - helm upgrade --install myapp ./chart --set image.tag=$APP_VERSION --set database.password=$DATABASE_PASSWORD
    environment:
        DATABASE_PASSWORD: $DATABASE_PASSWORD # From CI/CD variables
```

#### Implement Configuration Validation

```yaml
# Good: Validate configuration early
validate-config:
    stage: validate
    script:
        - |
            # Check required environment variables
            if [ -z "$DATABASE_URL" ]; then
              echo "ERROR: DATABASE_URL is not set"
              exit 1
            fi

            # Validate configuration files
            yamllint .gitlab-ci.yml
            helm lint ./helm-chart
            terraform validate
```

#### Use Configuration Templates

```yaml
# Use YAML anchors for reusable configuration
.deploy_template: &deploy_template
    image: bitnami/kubectl
    before_script:
        - kubectl config use-context $KUBE_CONTEXT
    script:
        - helm upgrade --install $APP_NAME ./helm-chart --namespace $NAMESPACE --set image.tag=$IMAGE_TAG

deploy:staging:
    <<: *deploy_template
    variables:
        NAMESPACE: staging
        KUBE_CONTEXT: staging-cluster

deploy:production:
    <<: *deploy_template
    variables:
        NAMESPACE: production
        KUBE_CONTEXT: production-cluster
```

### 3. Error Handling and Resilience

#### Implement Proper Error Handling

```bash
#!/bin/bash
# Good: Proper error handling in scripts

set -euo pipefail  # Exit on error, undefined vars, pipe failures

cleanup() {
    echo "Cleaning up..."
    docker-compose down || true
    rm -f temp-files/* || true
}

trap cleanup EXIT

# Function with error handling
deploy_service() {
    local service=$1
    local max_retries=3
    local retry_count=0

    while [ $retry_count -lt $max_retries ]; do
        if kubectl apply -f "k8s/${service}.yaml"; then
            echo "Successfully deployed $service"
            return 0
        else
            ((retry_count++))
            echo "Deployment failed, retry $retry_count/$max_retries"
            sleep 10
        fi
    done

    echo "Failed to deploy $service after $max_retries attempts"
    return 1
}
```

#### Use Retry Mechanisms

```yaml
# GitLab CI retry configuration
deploy:
  retry:
    max: 3
    when:
      - runner_system_failure
      - stuck_or_timeout_failure
      - scheduler_failure
  script:
    - kubectl apply -f k8s/

# GitHub Actions retry with backoff
- name: Deploy with retry
  uses: nick-invision/retry@v2
  with:
    timeout_minutes: 10
    max_attempts: 3
    retry_wait_seconds: 30
    command: kubectl apply -f k8s/
```

#### Implement Circuit Breakers

```yaml
# Stop pipeline if critical services fail
validate-dependencies:
    stage: validate
    script:
        - |
            # Check if external services are available
            if ! curl -f --max-time 10 https://api.external-service.com/health; then
              echo "External service unavailable, stopping pipeline"
              exit 1
            fi
    allow_failure: false # Critical check
```

## Security Best Practices

### 1. Secret Management

#### Never Hardcode Secrets

```yaml
# Bad: Hardcoded secrets
deploy:
  script:
    - kubectl create secret generic app-secret
      --from-literal=password=mypassword123

# Good: Use CI/CD variables
deploy:
  script:
    - kubectl create secret generic app-secret
      --from-literal=password=$DATABASE_PASSWORD
```

#### Use Appropriate Secret Stores

```yaml
# Good: Integration with secret management systems
get-secrets:
    image: vault:latest
    script:
        - |
            # Get secrets from HashiCorp Vault
            export VAULT_TOKEN=$(vault auth -method=aws)
            DATABASE_PASSWORD=$(vault kv get -field=password secret/app/db)

            # Store in CI/CD variables for later use
            echo "DATABASE_PASSWORD=$DATABASE_PASSWORD" >> build.env
    artifacts:
        reports:
            dotenv: build.env
```

#### Implement Secret Rotation

```yaml
# Regular secret rotation pipeline
rotate-secrets:
    stage: maintenance
    rules:
        - if: $CI_PIPELINE_SOURCE == "schedule"
    script:
        - |
            # Generate new secrets
            NEW_PASSWORD=$(openssl rand -base64 32)

            # Update in secret store
            vault kv put secret/app/db password=$NEW_PASSWORD

            # Update application
            kubectl patch secret app-secret -p "{\"data\":{\"password\":\"$(echo -n $NEW_PASSWORD | base64)\"}}"

            # Restart pods to pick up new secret
            kubectl rollout restart deployment/app
```

### 2. Access Control and Permissions

#### Implement Least Privilege Access

```yaml
# Good: Specific permissions per job
build:
    # Only needs read access to code
    permissions:
        contents: read
    script:
        - docker build -t myapp .

deploy:
    # Needs write access to packages
    permissions:
        contents: read
        packages: write
    script:
        - docker push myapp
```

#### Use Service Accounts

```yaml
# Good: Dedicated service accounts
deploy:
    image: google/cloud-sdk:alpine
    script:
        - |
            # Authenticate with service account
            echo $GOOGLE_SERVICE_ACCOUNT_KEY | base64 -d > key.json
            gcloud auth activate-service-account --key-file key.json

            # Deploy with limited permissions
            gcloud run deploy myapp --image=myapp:latest
```

#### Implement Pipeline Security Scanning

```yaml
# Security scanning pipeline
security-scan:
    stage: security
    parallel:
        matrix:
            - SCAN_TYPE: [sast, dast, dependency, container, infrastructure]
    script:
        - |
            case $SCAN_TYPE in
              sast)
                semgrep --config=auto --json --output=sast-report.json .
                ;;
              dast)
                zap-baseline.py -t $APPLICATION_URL -J dast-report.json
                ;;
              dependency)
                npm audit --json > dependency-report.json
                ;;
              container)
                trivy image --format json --output container-report.json $DOCKER_IMAGE
                ;;
              infrastructure)
                checkov -f Dockerfile --framework dockerfile --output json > infra-report.json
                ;;
            esac
    artifacts:
        reports:
            sast: sast-report.json
        paths:
            - '*-report.json'
```

### 3. Supply Chain Security

#### Verify Dependencies

```yaml
verify-dependencies:
    stage: security
    script:
        - |
            # Verify package signatures
            npm audit signatures

            # Check for known vulnerabilities
            npm audit --audit-level high

            # Generate Software Bill of Materials (SBOM)
            syft packages . -o spdx-json > sbom.json
    artifacts:
        paths:
            - sbom.json
```

#### Implement Signed Commits

```yaml
verify-commits:
    stage: validate
    script:
        - |
            # Verify GPG signatures on commits
            git log --show-signature -n 5

            # Check if commits are signed
            unsigned_commits=$(git log --pretty="format:%H %G?" -n 10 | grep -v "G" | wc -l)
            if [ $unsigned_commits -gt 0 ]; then
              echo "Found $unsigned_commits unsigned commits"
              exit 1
            fi
```

## Performance Optimization

### 1. Build Optimization

#### Use Multi-Stage Docker Builds

```dockerfile
# Good: Multi-stage build for optimization
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### Implement Effective Caching

```yaml
# Good: Layered caching strategy
build:
    image: docker:24.0.5
    services:
        - docker:24.0.5-dind
    variables:
        DOCKER_BUILDKIT: 1
    script:
        - |
            # Multi-level caching
            docker build \
              --cache-from $CI_REGISTRY_IMAGE:cache-deps \
              --cache-from $CI_REGISTRY_IMAGE:cache-build \
              --cache-from $CI_REGISTRY_IMAGE:latest \
              --target production \
              --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA \
              .

            # Cache intermediate layers
            docker build --target dependencies --tag $CI_REGISTRY_IMAGE:cache-deps .
            docker build --target build --tag $CI_REGISTRY_IMAGE:cache-build .

            # Push all cache layers
            docker push $CI_REGISTRY_IMAGE:cache-deps
            docker push $CI_REGISTRY_IMAGE:cache-build
            docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

#### Optimize Parallel Execution

```yaml
# Good: Parallel job execution
test:
    stage: test
    parallel:
        matrix:
            - TEST_SUITE: [unit, integration, e2e]
            - NODE_VERSION: [16, 18, 20]
    script:
        - npm run test:$TEST_SUITE
```

### 2. Resource Management

#### Right-Size Pipeline Resources

```yaml
# Good: Appropriate resource allocation
build:
    tags:
        - large-runner # Use larger runner for build jobs
    variables:
        KUBERNETES_CPU_REQUEST: '2'
        KUBERNETES_MEMORY_REQUEST: '4Gi'

test:
    tags:
        - small-runner # Use smaller runner for tests
    variables:
        KUBERNETES_CPU_REQUEST: '500m'
        KUBERNETES_MEMORY_REQUEST: '1Gi'
```

#### Implement Resource Cleanup

```yaml
# Good: Automatic cleanup
cleanup:
    stage: .post
    script:
        - |
            # Clean up test resources
            docker system prune -f
            kubectl delete pods --field-selector=status.phase=Succeeded -n test

            # Clean up old artifacts
            find /tmp -name "*.tmp" -mtime +1 -delete
    when: always
```

## Pipeline Design Patterns

### 1. Progressive Deployment Pattern

```yaml
# Progressive deployment with automated rollback
deploy:
    stage: deploy
    script:
        - |
            # Deploy to small percentage of traffic
            kubectl patch service myapp -p '{"spec":{"selector":{"version":"canary"}}}'
            kubectl set image deployment/myapp-canary myapp=$NEW_IMAGE

            # Wait for canary to be ready
            kubectl wait --for=condition=available deployment/myapp-canary --timeout=300s

            # Run health checks
            for i in {1..10}; do
              if curl -f https://canary.myapp.com/health; then
                echo "Canary health check passed"
              else
                echo "Canary health check failed, rolling back"
                kubectl patch service myapp -p '{"spec":{"selector":{"version":"stable"}}}'
                exit 1
              fi
              sleep 30
            done

            # Gradually increase traffic
            for percentage in 10 25 50 75 100; do
              echo "Routing $percentage% traffic to canary"
              kubectl patch ingress myapp --type='merge' -p="{\"metadata\":{\"annotations\":{\"nginx.ingress.kubernetes.io/canary-weight\":\"$percentage\"}}}"
              sleep 300
              
              # Check error rates
              error_rate=$(curl -s "https://monitoring.myapp.com/api/error-rate?service=myapp&duration=5m" | jq -r '.error_rate')
              if (( $(echo "$error_rate > 0.01" | bc -l) )); then
                echo "Error rate too high ($error_rate), rolling back"
                kubectl patch ingress myapp --type='merge' -p='{"metadata":{"annotations":{"nginx.ingress.kubernetes.io/canary-weight":"0"}}}'
                exit 1
              fi
            done

            # Promote canary to stable
            kubectl patch service myapp -p '{"spec":{"selector":{"version":"canary"}}}'
            kubectl delete deployment myapp-stable
            kubectl scale deployment myapp-canary --replicas=5
```

### 2. Feature Flag Integration Pattern

```yaml
# Feature flag driven deployment
deploy-with-flags:
    stage: deploy
    script:
        - |
            # Deploy new version with feature flags off
            kubectl set image deployment/myapp myapp=$NEW_IMAGE
            kubectl set env deployment/myapp FEATURE_NEW_UI=false

            # Wait for deployment
            kubectl rollout status deployment/myapp

            # Gradually enable feature flags
            feature_flags=("FEATURE_NEW_UI:10" "FEATURE_NEW_API:5" "FEATURE_ANALYTICS:50")

            for flag_config in "${feature_flags[@]}"; do
              flag_name=$(echo $flag_config | cut -d':' -f1)
              percentage=$(echo $flag_config | cut -d':' -f2)
              
              echo "Enabling $flag_name for $percentage% of users"
              curl -X POST "https://feature-flags.myapp.com/api/flags/$flag_name" \
                -H "Authorization: Bearer $FEATURE_FLAG_TOKEN" \
                -d "{\"enabled\":true,\"percentage\":$percentage}"
              
              sleep 600  # Wait 10 minutes between rollouts
              
              # Check metrics
              error_count=$(curl -s "https://monitoring.myapp.com/api/errors?feature=$flag_name&duration=10m" | jq -r '.count')
              if [ "$error_count" -gt 10 ]; then
                echo "Too many errors for $flag_name, disabling"
                curl -X POST "https://feature-flags.myapp.com/api/flags/$flag_name" \
                  -H "Authorization: Bearer $FEATURE_FLAG_TOKEN" \
                  -d "{\"enabled\":false}"
                exit 1
              fi
            done
```

### 3. Multi-Environment Promotion Pattern

```yaml
# Automatic promotion through environments
promote:
    stage: promote
    rules:
        - if: $CI_COMMIT_BRANCH == "main"
    script:
        - |
            environments=("dev" "staging" "production")

            for i in "${!environments[@]}"; do
              env=${environments[$i]}
              
              echo "Deploying to $env environment"
              
              # Deploy to environment
              helm upgrade --install myapp-$env ./helm-chart \
                --namespace $env \
                --set image.tag=$CI_COMMIT_SHA \
                --set environment=$env
              
              # Wait for deployment
              kubectl wait --for=condition=available deployment/myapp-$env -n $env --timeout=300s
              
              # Run environment-specific tests
              case $env in
                dev)
                  npm run test:smoke -- --env=dev
                  ;;
                staging)
                  npm run test:integration -- --env=staging
                  npm run test:performance -- --env=staging
                  ;;
                production)
                  # Production requires manual approval
                  if [ $i -eq 2 ]; then
                    echo "Production deployment requires manual approval"
                    exit 0
                  fi
                  ;;
              esac
              
              # Check health before promoting to next environment
              health_check_url="https://$env.myapp.com/health"
              for attempt in {1..10}; do
                if curl -f $health_check_url; then
                  echo "$env environment is healthy"
                  break
                else
                  if [ $attempt -eq 10 ]; then
                    echo "$env environment failed health check"
                    exit 1
                  fi
                  sleep 30
                fi
              done
            done
```

## Testing Strategies

### 1. Comprehensive Test Coverage

```yaml
# Multi-layered testing approach
test:
    stage: test
    parallel:
        matrix:
            - TEST_TYPE:
                  [unit, integration, contract, e2e, performance, security]
    script:
        - |
            case $TEST_TYPE in
              unit)
                npm run test:unit -- --coverage --reporter=junit --outputFile=unit-results.xml
                ;;
              integration)
                docker-compose -f docker-compose.test.yml up -d
                npm run test:integration -- --reporter=junit --outputFile=integration-results.xml
                docker-compose -f docker-compose.test.yml down
                ;;
              contract)
                # Consumer-driven contract testing
                npm run test:pact:consumer
                pact-broker publish pacts/ --consumer-app-version=$CI_COMMIT_SHA
                ;;
              e2e)
                # End-to-end testing with Playwright
                npx playwright test --reporter=junit
                ;;
              performance)
                # Load testing with k6
                k6 run --out influxdb=http://influxdb:8086/k6 performance-tests.js
                ;;
              security)
                # Security testing with ZAP
                zap-baseline.py -t $APPLICATION_URL -J security-results.json
                ;;
            esac
    artifacts:
        reports:
            junit: '*-results.xml'
        paths:
            - coverage/
            - test-results/
    coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
```

### 2. Test Data Management

```yaml
# Test data management strategy
setup-test-data:
    stage: .pre
    script:
        - |
            # Create test database with fixtures
            kubectl apply -f k8s/test-database.yaml

            # Wait for database to be ready
            kubectl wait --for=condition=ready pod -l app=test-db --timeout=300s

            # Load test fixtures
            kubectl exec -i deployment/test-db -- psql -U testuser -d testdb < fixtures/test-data.sql

            # Create test users and permissions
            curl -X POST "https://auth-service/api/test-users" \
              -H "Content-Type: application/json" \
              -d @fixtures/test-users.json
    artifacts:
        reports:
            dotenv: test-env.env

cleanup-test-data:
    stage: .post
    script:
        - |
            # Clean up test resources
            kubectl delete -f k8s/test-database.yaml

            # Remove test users
            curl -X DELETE "https://auth-service/api/test-users/cleanup"
    when: always
```

### 3. Flaky Test Management

```yaml
# Flaky test detection and management
test-with-retry:
    stage: test
    script:
        - |
            # Run tests with retry mechanism
            max_attempts=3
            attempt=1

            while [ $attempt -le $max_attempts ]; do
              echo "Test attempt $attempt of $max_attempts"
              
              if npm run test; then
                echo "Tests passed on attempt $attempt"
                exit 0
              else
                if [ $attempt -eq $max_attempts ]; then
                  echo "Tests failed after $max_attempts attempts"
                  
                  # Report flaky tests
                  npm run test:flaky-report
                  exit 1
                else
                  echo "Tests failed, retrying..."
                  ((attempt++))
                  sleep 30
                fi
              fi
            done
    artifacts:
        when: on_failure
        paths:
            - test-results/
            - flaky-test-report.json
```

## Deployment Strategies

### 1. Blue-Green Deployment

```yaml
blue-green-deploy:
    stage: deploy
    script:
        - |
            # Determine current and new slots
            CURRENT_SLOT=$(kubectl get service myapp -o jsonpath='{.spec.selector.slot}' || echo 'blue')
            NEW_SLOT=$([[ "$CURRENT_SLOT" == "blue" ]] && echo "green" || echo "blue")

            echo "Current slot: $CURRENT_SLOT, deploying to: $NEW_SLOT"

            # Deploy to new slot
            helm upgrade --install myapp-$NEW_SLOT ./helm-chart \
              --set slot=$NEW_SLOT \
              --set image.tag=$CI_COMMIT_SHA \
              --set replicas=3

            # Wait for new deployment to be ready
            kubectl wait --for=condition=available deployment/myapp-$NEW_SLOT --timeout=300s

            # Run smoke tests against new slot
            NEW_SLOT_URL="https://$NEW_SLOT.myapp.com"
            curl -f $NEW_SLOT_URL/health
            curl -f $NEW_SLOT_URL/api/version

            # Switch traffic to new slot
            kubectl patch service myapp -p "{\"spec\":{\"selector\":{\"slot\":\"$NEW_SLOT\"}}}"

            # Verify switch was successful
            sleep 30
            ACTIVE_SLOT=$(kubectl get service myapp -o jsonpath='{.spec.selector.slot}')
            if [[ "$ACTIVE_SLOT" != "$NEW_SLOT" ]]; then
              echo "Traffic switch failed"
              exit 1
            fi

            # Keep old slot for quick rollback (cleanup after 1 hour)
            echo "Scheduling cleanup of old slot in 1 hour"
            at now + 1 hour <<< "kubectl delete deployment myapp-$CURRENT_SLOT"
```

### 2. Canary Deployment with Automated Analysis

```yaml
canary-deploy:
  stage: deploy
  script:
    - |
      # Deploy canary version
      kubectl set image deployment/myapp-canary myapp=$NEW_IMAGE
      kubectl wait --for=condition=available deployment/myapp-canary --timeout=300s

      # Configure traffic splitting (5% to canary)
      kubectl patch ingress myapp --type='merge' \
        -p='{"metadata":{"annotations":{"nginx.ingress.kubernetes.io/canary":"true","nginx.ingress.kubernetes.io/canary-weight":"5"}}}'

      # Automated canary analysis
      analysis_duration=1800  # 30 minutes
      check_interval=300      # 5 minutes
      elapsed=0

      while [ $elapsed -lt $analysis_duration ]; do
        echo "Analyzing canary deployment (${elapsed}s/${analysis_duration}s)"

        # Get metrics from monitoring system
        error_rate=$(curl -s "https://monitoring/api/v1/query?query=error_rate_5m{version=\"canary\"}" | jq -r '.data.result[0].value[1]')
        latency_p99=$(curl -s "https://monitoring/api/v1/query?query=latency_p99_5m{version=\"canary\"}" | jq -r '.data.result[0].value[1]')

        # Define thresholds
        error_threshold=0.01  # 1%
        latency_threshold=2.0 # 2 seconds

        # Check if metrics are within acceptable range
        if (( $(echo "$error_rate > $error_threshold" | bc -l) )); then
          echo "Error rate too high: $error_rate > $error_threshold"
          rollback_canary
          exit 1
        fi

        if (( $(echo "$latency_p99 > $latency_threshold" | bc -l) )); then
          echo "Latency too high: $latency_p99 > $latency_threshold"
          rollback_canary
          exit 1
        fi

        echo "Metrics look good - Error rate: $error_rate, P99 latency: $latency_p99"

        sleep $check_interval
        elapsed=$((elapsed + check_interval))
      done

      # Gradually increase traffic
      for weight in 10 25 50 75 100; do
        echo "Increasing canary traffic to $weight%"
        kubectl patch ingress myapp --type='merge' \
          -p="{\"metadata\":{\"annotations\":{\"nginx.ingress.kubernetes.io/canary-weight\":\"$weight\"}}}"

        sleep 600  # Wait 10 minutes between increases

        # Continue monitoring during traffic increase
        # (similar monitoring logic as above)
      done

      # Promote canary to main deployment
      kubectl set image deployment/myapp myapp=$NEW_IMAGE
      kubectl patch ingress myapp --type='merge' \
        -p='{"metadata":{"annotations":{"nginx.ingress.kubernetes.io/canary":"false"}}}'

rollback_canary() {
  echo "Rolling back canary deployment"
  kubectl patch ingress myapp --type='merge' \
    -p='{"metadata":{"annotations":{"nginx.ingress.kubernetes.io/canary":"false"}}}'
  kubectl rollout undo deployment/myapp-canary
}
```

### 3. Feature Toggle Deployment

```yaml
feature-toggle-deploy:
    stage: deploy
    script:
        - |
            # Deploy new version with all features disabled
            kubectl set image deployment/myapp myapp=$NEW_IMAGE
            kubectl rollout status deployment/myapp

            # Configure feature flags for gradual rollout
            features=(
              "new-ui:10:user_segment:beta_users"
              "improved-search:25:random:25"
              "new-checkout:5:geographic:us_east"
            )

            for feature_config in "${features[@]}"; do
              IFS=':' read -r feature_name percentage strategy target <<< "$feature_config"
              
              echo "Enabling $feature_name for $percentage% via $strategy strategy"
              
              # Configure feature flag via API
              curl -X PUT "https://feature-flags.myapp.com/api/flags/$feature_name" \
                -H "Authorization: Bearer $FEATURE_FLAG_TOKEN" \
                -H "Content-Type: application/json" \
                -d "{
                  \"enabled\": true,
                  \"percentage\": $percentage,
                  \"strategy\": \"$strategy\",
                  \"target\": \"$target\"
                }"
              
              # Monitor feature flag impact
              sleep 900  # Wait 15 minutes
              
              # Get metrics for this feature
              feature_metrics=$(curl -s "https://analytics.myapp.com/api/feature-metrics?feature=$feature_name&duration=15m")
              conversion_rate=$(echo $feature_metrics | jq -r '.conversion_rate')
              error_count=$(echo $feature_metrics | jq -r '.error_count')
              
              # Check if feature is performing well
              if (( $(echo "$conversion_rate < 0.8" | bc -l) )) || [ "$error_count" -gt 50 ]; then
                echo "Feature $feature_name performing poorly, disabling"
                curl -X PUT "https://feature-flags.myapp.com/api/flags/$feature_name" \
                  -H "Authorization: Bearer $FEATURE_FLAG_TOKEN" \
                  -H "Content-Type: application/json" \
                  -d '{"enabled": false}'
              else
                echo "Feature $feature_name performing well"
              fi
            done
```

## Monitoring and Observability

### 1. Pipeline Monitoring

```yaml
# Comprehensive pipeline monitoring
monitor-pipeline:
    stage: .post
    script:
        - |
            # Collect pipeline metrics
            PIPELINE_DURATION=$(($(date +%s) - $CI_PIPELINE_CREATED_AT))
            PIPELINE_STATUS=${CI_JOB_STATUS:-unknown}

            # Send metrics to monitoring system
            curl -X POST "https://metrics.myapp.com/api/v1/metrics" \
              -H "Content-Type: application/json" \
              -d "{
                \"metric\": \"pipeline.duration\",
                \"value\": $PIPELINE_DURATION,
                \"tags\": {
                  \"project\": \"$CI_PROJECT_NAME\",
                  \"branch\": \"$CI_COMMIT_REF_NAME\",
                  \"pipeline_id\": \"$CI_PIPELINE_ID\"
                }
              }"

            curl -X POST "https://metrics.myapp.com/api/v1/metrics" \
              -H "Content-Type: application/json" \
              -d "{
                \"metric\": \"pipeline.status\",
                \"value\": 1,
                \"tags\": {
                  \"project\": \"$CI_PROJECT_NAME\",
                  \"status\": \"$PIPELINE_STATUS\",
                  \"branch\": \"$CI_COMMIT_REF_NAME\"
                }
              }"

            # Create deployment event in monitoring system
            if [ "$CI_JOB_STAGE" = "deploy" ] && [ "$PIPELINE_STATUS" = "success" ]; then
              curl -X POST "https://monitoring.myapp.com/api/v1/events" \
                -H "Content-Type: application/json" \
                -d "{
                  \"title\": \"Deployment: $CI_PROJECT_NAME\",
                  \"text\": \"Deployed $CI_COMMIT_SHA to $CI_ENVIRONMENT_NAME\",
                  \"tags\": [\"deployment\", \"$CI_ENVIRONMENT_NAME\"],
                  \"alert_type\": \"success\"
                }"
            fi
    when: always
```

### 2. Application Health Monitoring

```yaml
# Post-deployment monitoring
post-deploy-monitoring:
    stage: verify
    script:
        - |
            APP_URL="https://$CI_ENVIRONMENT_NAME.myapp.com"

            # Wait for application to be ready
            echo "Waiting for application to be ready..."
            for i in {1..30}; do
              if curl -f $APP_URL/health; then
                echo "Application is ready"
                break
              else
                if [ $i -eq 30 ]; then
                  echo "Application failed to become ready"
                  exit 1
                fi
                sleep 10
              fi
            done

            # Run comprehensive health checks
            health_checks=(
              "$APP_URL/health"
              "$APP_URL/api/version"
              "$APP_URL/api/metrics"
              "$APP_URL/ready"
            )

            for endpoint in "${health_checks[@]}"; do
              echo "Checking $endpoint"
              response=$(curl -s -o /dev/null -w "%{http_code}" $endpoint)
              if [ "$response" != "200" ]; then
                echo "Health check failed for $endpoint (HTTP $response)"
                exit 1
              fi
            done

            # Performance baseline check
            echo "Running performance baseline check"
            response_time=$(curl -o /dev/null -s -w "%{time_total}" $APP_URL/api/test)
            if (( $(echo "$response_time > 2.0" | bc -l) )); then
              echo "Response time too slow: ${response_time}s"
              exit 1
            fi

            echo "All health checks passed"
```

### 3. Alerting Integration

```yaml
# Alerting and notification system
notify-deployment:
  stage: .post
  script:
    - |
      DEPLOYMENT_STATUS=${CI_JOB_STATUS:-unknown}
      DEPLOYMENT_URL="https://$CI_ENVIRONMENT_NAME.myapp.com"

      # Prepare notification message
      if [ "$DEPLOYMENT_STATUS" = "success" ]; then
        EMOJI="✅"
        COLOR="good"
        MESSAGE="Deployment successful"
      else
        EMOJI="❌"
        COLOR="danger"
        MESSAGE="Deployment failed"
      fi

      # Send Slack notification
      curl -X POST $SLACK_WEBHOOK_URL \
        -H "Content-Type: application/json" \
        -d "{
          \"channel\": \"#deployments\",
          \"username\": \"GitLab CI\",
          \"icon_emoji\": \":rocket:\",
          \"attachments\": [{
            \"color\": \"$COLOR\",
            \"title\": \"$EMOJI $MESSAGE: $CI_PROJECT_NAME\",
            \"fields\": [
              {\"title\": \"Environment\", \"value\": \"$CI_ENVIRONMENT_NAME\", \"short\": true},
              {\"title\": \"Branch\", \"value\": \"$CI_COMMIT_REF_NAME\", \"short\": true},
              {\"title\": \"Commit\", \"value\": \"$CI_COMMIT_SHA\", \"short\": true},
              {\"title\": \"URL\", \"value\": \"$DEPLOYMENT_URL\", \"short\": true}
            ],
            \"actions\": [{
              \"type\": \"button\",
              \"text\": \"View Pipeline\",
              \"url\": \"$CI_PIPELINE_URL\"
            }]
          }]
        }"

      # Send email notification for production deployments
      if [ "$CI_ENVIRONMENT_NAME" = "production" ]; then
        python3 << EOF
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Email configuration
smtp_server = os.environ['SMTP_SERVER']
smtp_port = int(os.environ['SMTP_PORT'])
smtp_user = os.environ['SMTP_USER']
smtp_password = os.environ['SMTP_PASSWORD']

# Create message
msg = MIMEMultipart()
msg['From'] = smtp_user
msg['To'] = 'team@myapp.com'
msg['Subject'] = f'Production Deployment: {os.environ["CI_PROJECT_NAME"]}'

body = f"""
Production deployment {'completed successfully' if '$DEPLOYMENT_STATUS' == 'success' else 'failed'}:

Project: {os.environ['CI_PROJECT_NAME']}
Environment: {os.environ['CI_ENVIRONMENT_NAME']}
Branch: {os.environ['CI_COMMIT_REF_NAME']}
Commit: {os.environ['CI_COMMIT_SHA']}
Pipeline: {os.environ['CI_PIPELINE_URL']}
Application URL: $DEPLOYMENT_URL
"""

msg.attach(MIMEText(body, 'plain'))

# Send email
server = smtplib.SMTP(smtp_server, smtp_port)
server.starttls()
server.login(smtp_user, smtp_password)
server.send_message(msg)
server.quit()
EOF
      fi
  when: always
```

This comprehensive best practices guide provides actionable patterns and examples that can be adapted across different
CI/CD platforms while maintaining high standards for security, performance, and reliability.
