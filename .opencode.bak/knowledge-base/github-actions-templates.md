---
title: GitHub Actions Templates Knowledge Base
description: Comprehensive collection of GitHub Actions workflow templates and patterns for modern CI/CD implementations.
type: knowledge-base
category: cicd
version: 1.0.0
tags:
  - knowledge
  - cicd
  - github
  - actions
  - templates
last_updated: 2025-11-19
---

# GitHub Actions Templates Knowledge Base

Comprehensive collection of GitHub Actions workflow templates and patterns for modern CI/CD implementations.

## Table of Contents

- [GitHub Actions Templates Knowledge Base](#github-actions-templates-knowledge-base)
  - [Table of Contents](#table-of-contents)
  - [Basic Workflow Patterns](#basic-workflow-patterns)
    - [Node.js Application Workflow](#nodejs-application-workflow)
    - [Python Application Workflow](#python-application-workflow)
  - [Advanced Workflow Patterns](#advanced-workflow-patterns)
    - [Monorepo with Path-Based Triggers](#monorepo-with-path-based-triggers)
    - [Dynamic Matrix from JSON](#dynamic-matrix-from-json)
  - [Multi-Environment Deployments](#multi-environment-deployments)
    - [Environment-Specific Deployment](#environment-specific-deployment)
  - [Matrix Strategies](#matrix-strategies)
    - [Cross-Platform Testing Matrix](#cross-platform-testing-matrix)
    - [Database Testing Matrix](#database-testing-matrix)
  - [Reusable Workflows](#reusable-workflows)
    - [Reusable Build Workflow](#reusable-build-workflow)
    - [Reusable Deployment Workflow](#reusable-deployment-workflow)
    - [Using Reusable Workflows](#using-reusable-workflows)
  - [Custom Actions](#custom-actions)
    - [TypeScript Action Example](#typescript-action-example)
    - [Composite Action Example](#composite-action-example)
  - [Performance Optimization](#performance-optimization)
    - [Build Optimization](#build-optimization)

## Basic Workflow Patterns

### Node.js Application Workflow

```yaml
name: Node.js CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      deploy_environment:
        description: 'Environment to deploy to'
        required: false
        default: 'staging'
        type: choice
        options:
          - staging
          - production

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16, 18, 20]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        if: matrix.node-version == 18
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name != 'pull_request'

    permissions:
      contents: read
      packages: write

    outputs:
      image: ${{ steps.meta.outputs.tags }}
      digest: ${{ steps.build.outputs.digest }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'

    environment:
      name: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
      url: ${{ steps.deploy.outputs.url }}

    steps:
      - name: Deploy to Kubernetes
        id: deploy
        run: |
          ENVIRONMENT=${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
          IMAGE_TAG=$(echo '${{ needs.build.outputs.image }}' | head -n1)

          echo "Deploying $IMAGE_TAG to $ENVIRONMENT"

          # Deployment logic here
          kubectl set image deployment/myapp myapp=$IMAGE_TAG -n $ENVIRONMENT
          kubectl rollout status deployment/myapp -n $ENVIRONMENT

          URL="https://$ENVIRONMENT.myapp.com"
          echo "url=$URL" >> $GITHUB_OUTPUT
```

### Python Application Workflow

```yaml
name: Python CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  PYTHON_VERSION: '3.11'

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        python-version: ['3.9', '3.10', '3.11', '3.12']

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping" --health-interval 10s --health-timeout 5s --health-retries 5
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}

      - name: Install Poetry
        uses: snok/install-poetry@v1
        with:
          version: 1.6.1
          virtualenvs-create: true
          virtualenvs-in-project: true

      - name: Load cached venv
        id: cached-poetry-dependencies
        uses: actions/cache@v3
        with:
          path: .venv
          key: venv-${{ runner.os }}-${{ matrix.python-version }}-${{ hashFiles('**/poetry.lock') }}

      - name: Install dependencies
        if: steps.cached-poetry-dependencies.outputs.cache-hit != 'true'
        run: poetry install --no-interaction --no-root

      - name: Install project
        run: poetry install --no-interaction

      - name: Run linting
        run: |
          poetry run black --check .
          poetry run isort --check-only .
          poetry run flake8 .
          poetry run mypy .

      - name: Run tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
          REDIS_URL: redis://localhost:6379
        run: |
          poetry run pytest --cov=src --cov-report=xml --cov-report=html

      - name: Upload coverage to Codecov
        if: matrix.python-version == '3.11'
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          file: ./coverage.xml

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name != 'pull_request'

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}

      - name: Install Poetry
        uses: snok/install-poetry@v1

      - name: Build package
        run: poetry build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  publish:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && startsWith(github.ref, 'refs/tags/')

    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - name: Publish to PyPI
        uses: pypa/gh-action-pypi-publish@release/v1
        with:
          password: ${{ secrets.PYPI_API_TOKEN }}
```

## Advanced Workflow Patterns

### Monorepo with Path-Based Triggers

```yaml
name: Monorepo CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      api: ${{ steps.changes.outputs.api }}
      frontend: ${{ steps.changes.outputs.frontend }}
      worker: ${{ steps.changes.outputs.worker }}
      shared: ${{ steps.changes.outputs.shared }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            api:
              - 'packages/api/**'
              - 'packages/shared/**'
              - 'package.json'
              - 'yarn.lock'
            frontend:
              - 'packages/frontend/**'
              - 'packages/shared/**'
              - 'package.json'
              - 'yarn.lock'
            worker:
              - 'packages/worker/**'
              - 'packages/shared/**'
              - 'package.json'
              - 'yarn.lock'
            shared:
              - 'packages/shared/**'

  build-api:
    needs: changes
    if: needs.changes.outputs.api == 'true'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build shared package
        if: needs.changes.outputs.shared == 'true'
        run: yarn workspace shared build

      - name: Test API
        run: yarn workspace api test

      - name: Build API
        run: yarn workspace api build

      - name: Build Docker image
        run: |
          docker build -f packages/api/Dockerfile -t api:${{ github.sha }} .

  build-frontend:
    needs: changes
    if: needs.changes.outputs.frontend == 'true'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build shared package
        if: needs.changes.outputs.shared == 'true'
        run: yarn workspace shared build

      - name: Test Frontend
        run: yarn workspace frontend test

      - name: Build Frontend
        run: yarn workspace frontend build

      - name: Build Docker image
        run: |
          docker build -f packages/frontend/Dockerfile -t frontend:${{ github.sha }} .

  build-worker:
    needs: changes
    if: needs.changes.outputs.worker == 'true'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build shared package
        if: needs.changes.outputs.shared == 'true'
        run: yarn workspace shared build

      - name: Test Worker
        run: yarn workspace worker test

      - name: Build Worker
        run: yarn workspace worker build

      - name: Build Docker image
        run: |
          docker build -f packages/worker/Dockerfile -t worker:${{ github.sha }} .

  deploy:
    needs: [changes, build-api, build-frontend, build-worker]
    if: |
      always() && 
      (needs.build-api.result == 'success' || needs.build-api.result == 'skipped') &&
      (needs.build-frontend.result == 'success' || needs.build-frontend.result == 'skipped') &&
      (needs.build-worker.result == 'success' || needs.build-worker.result == 'skipped') &&
      github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy changed services
        run: |
          if [[ "${{ needs.changes.outputs.api }}" == "true" ]]; then
            echo "Deploying API service"
            kubectl set image deployment/api api=api:${{ github.sha }}
          fi

          if [[ "${{ needs.changes.outputs.frontend }}" == "true" ]]; then
            echo "Deploying Frontend service"
            kubectl set image deployment/frontend frontend=frontend:${{ github.sha }}
          fi

          if [[ "${{ needs.changes.outputs.worker }}" == "true" ]]; then
            echo "Deploying Worker service"
            kubectl set image deployment/worker worker=worker:${{ github.sha }}
          fi
```

### Dynamic Matrix from JSON

```yaml
name: Dynamic Matrix Build

on:
  push:
    branches: [main]

jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4

      - name: Set matrix
        id: set-matrix
        run: |
          # Read configuration from file
          MATRIX=$(cat .github/build-matrix.json | jq -c .)
          echo "matrix=$MATRIX" >> $GITHUB_OUTPUT

  build:
    needs: setup
    runs-on: ubuntu-latest
    strategy:
      matrix: ${{ fromJson(needs.setup.outputs.matrix) }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup environment
        run: |
          echo "Building ${{ matrix.service }} with ${{ matrix.version }} on ${{ matrix.platform }}"

      - name: Build service
        run: |
          cd services/${{ matrix.service }}
          docker build --platform ${{ matrix.platform }} \
            -t ${{ matrix.service }}:${{ matrix.version }} .
```

**.github/build-matrix.json**:

```json
{
  "include": [
    {
      "service": "api",
      "version": "v1.0.0",
      "platform": "linux/amd64"
    },
    {
      "service": "api",
      "version": "v1.0.0",
      "platform": "linux/arm64"
    },
    {
      "service": "frontend",
      "version": "v2.0.0",
      "platform": "linux/amd64"
    },
    {
      "service": "worker",
      "version": "v1.5.0",
      "platform": "linux/amd64"
    }
  ]
}
```

## Multi-Environment Deployments

### Environment-Specific Deployment

```yaml
name: Multi-Environment Deployment

on:
  push:
    branches: [main, develop, 'feature/*']
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - development
          - staging
          - production

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    outputs:
      image: ${{ steps.meta.outputs.tags }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy-development:
    needs: build
    if: github.ref == 'refs/heads/develop' || startsWith(github.ref, 'refs/heads/feature/')
    runs-on: ubuntu-latest
    environment:
      name: development
      url: https://dev.myapp.com

    steps:
      - name: Deploy to development
        run: |
          IMAGE_TAG=$(echo '${{ needs.build.outputs.image }}' | head -n1)

          helm upgrade --install myapp ./helm-chart \
            --namespace development \
            --set image.tag=$IMAGE_TAG \
            --set environment=development \
            --set replicas=1 \
            --set resources.requests.cpu=100m \
            --set resources.requests.memory=128Mi

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/main' || github.event.inputs.environment == 'staging'
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.myapp.com

    steps:
      - name: Deploy to staging
        run: |
          IMAGE_TAG=$(echo '${{ needs.build.outputs.image }}' | head -n1)

          helm upgrade --install myapp ./helm-chart \
            --namespace staging \
            --set image.tag=$IMAGE_TAG \
            --set environment=staging \
            --set replicas=2 \
            --set resources.requests.cpu=200m \
            --set resources.requests.memory=256Mi

  deploy-production:
    needs: [build, deploy-staging]
    if: github.ref == 'refs/heads/main' && (github.event.inputs.environment == 'production' ||
      contains(github.event.head_commit.message, '[deploy-prod]'))
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.com

    steps:
      - name: Deploy to production
        run: |
          IMAGE_TAG=$(echo '${{ needs.build.outputs.image }}' | head -n1)

          # Blue-green deployment
          CURRENT_SLOT=$(kubectl get service myapp -o jsonpath='{.spec.selector.slot}' || echo 'blue')
          NEW_SLOT=$([[ "$CURRENT_SLOT" == "blue" ]] && echo "green" || echo "blue")

          echo "Deploying to $NEW_SLOT slot"

          helm upgrade --install myapp-$NEW_SLOT ./helm-chart \
            --namespace production \
            --set image.tag=$IMAGE_TAG \
            --set environment=production \
            --set slot=$NEW_SLOT \
            --set replicas=5 \
            --set resources.requests.cpu=500m \
            --set resources.requests.memory=512Mi

          # Wait for deployment
          kubectl wait --for=condition=available deployment/myapp-$NEW_SLOT --timeout=300s

          # Switch traffic
          kubectl patch service myapp -p "{\"spec\":{\"selector\":{\"slot\":\"$NEW_SLOT\"}}}"

          # Cleanup old slot after delay
          sleep 300
          helm delete myapp-$CURRENT_SLOT --namespace production || true
```

## Matrix Strategies

### Cross-Platform Testing Matrix

```yaml
name: Cross-Platform Testing

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ${{ matrix.os }}

    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
        include:
          # Additional configurations for specific combinations
          - os: ubuntu-latest
            node-version: 18
            coverage: true
          - os: windows-latest
            node-version: 18
            windows-specific: true
        exclude:
          # Skip certain combinations
          - os: macos-latest
            node-version: 16

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run coverage (Ubuntu + Node 18 only)
        if: matrix.coverage
        run: npm run test:coverage

      - name: Windows-specific tests
        if: matrix.windows-specific
        run: npm run test:windows

      - name: Upload coverage
        if: matrix.coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build-matrix:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        target:
          - platform: linux/amd64
            arch: amd64
          - platform: linux/arm64
            arch: arm64
          - platform: linux/arm/v7
            arch: armv7

    steps:
      - uses: actions/checkout@v4

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build for ${{ matrix.target.platform }}
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: ${{ matrix.target.platform }}
          tags: myapp:${{ matrix.target.arch }}
          push: false
          cache-from: type=gha,scope=${{ matrix.target.arch }}
          cache-to: type=gha,mode=max,scope=${{ matrix.target.arch }}
```

### Database Testing Matrix

```yaml
name: Database Compatibility Testing

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        database:
          - name: postgres
            version: '13'
            port: 5432
            env:
              POSTGRES_PASSWORD: postgres
              POSTGRES_DB: testdb
          - name: postgres
            version: '14'
            port: 5432
            env:
              POSTGRES_PASSWORD: postgres
              POSTGRES_DB: testdb
          - name: mysql
            version: '8.0'
            port: 3306
            env:
              MYSQL_ROOT_PASSWORD: mysql
              MYSQL_DATABASE: testdb
          - name: mysql
            version: '5.7'
            port: 3306
            env:
              MYSQL_ROOT_PASSWORD: mysql
              MYSQL_DATABASE: testdb

    services:
      database:
        image: ${{ matrix.database.name }}:${{ matrix.database.version }}
        env: ${{ matrix.database.env }}
        ports:
          - ${{ matrix.database.port }}:${{ matrix.database.port }}
        options: >-
          --health-cmd="${{ matrix.database.name == 'postgres' && 'pg_isready' || 'mysqladmin ping' }}"
          --health-interval=10s --health-timeout=5s --health-retries=5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        env:
          DATABASE_URL:
            ${{ matrix.database.name == 'postgres' && format('postgresql://postgres:postgres@localhost:5432/testdb') ||
            format('mysql://root:mysql@localhost:3306/testdb') }}
        run: npm run migrate

      - name: Run tests
        env:
          DATABASE_URL:
            ${{ matrix.database.name == 'postgres' && format('postgresql://postgres:postgres@localhost:5432/testdb') ||
            format('mysql://root:mysql@localhost:3306/testdb') }}
        run: npm test
```

## Reusable Workflows

### Reusable Build Workflow

**.github/workflows/build.yml**:

```yaml
name: Reusable Build Workflow

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: '18'
      registry:
        required: false
        type: string
        default: 'ghcr.io'
      dockerfile:
        required: false
        type: string
        default: 'Dockerfile'
      context:
        required: false
        type: string
        default: '.'
      push:
        required: false
        type: boolean
        default: true
    outputs:
      image:
        description: 'Built image tag'
        value: ${{ jobs.build.outputs.image }}
      digest:
        description: 'Image digest'
        value: ${{ jobs.build.outputs.digest }}
    secrets:
      registry-username:
        required: false
      registry-password:
        required: true

env:
  REGISTRY: ${{ inputs.registry }}
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    outputs:
      image: ${{ steps.meta.outputs.tags }}
      digest: ${{ steps.build.outputs.digest }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Setup Docker Buildx
        if: inputs.push
        uses: docker/setup-buildx-action@v3

      - name: Login to registry
        if: inputs.push
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ secrets.registry-username || github.actor }}
          password: ${{ secrets.registry-password }}

      - name: Extract metadata
        if: inputs.push
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-

      - name: Build and push Docker image
        if: inputs.push
        id: build
        uses: docker/build-push-action@v5
        with:
          context: ${{ inputs.context }}
          file: ${{ inputs.dockerfile }}
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### Reusable Deployment Workflow

**.github/workflows/deploy.yml**:

```yaml
name: Reusable Deployment Workflow

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
      image:
        required: true
        type: string
      namespace:
        required: false
        type: string
        default: ${{ inputs.environment }}
      replicas:
        required: false
        type: number
        default: 1
      helm-chart:
        required: false
        type: string
        default: './helm-chart'
    secrets:
      kubeconfig:
        required: true
      slack-webhook:
        required: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: ${{ inputs.environment }}
      url: ${{ steps.deploy.outputs.url }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.28.0'

      - name: Setup Helm
        uses: azure/setup-helm@v3
        with:
          version: '3.12.0'

      - name: Configure Kubernetes
        run: |
          echo '${{ secrets.kubeconfig }}' | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig
          kubectl cluster-info

      - name: Deploy application
        id: deploy
        run: |
          export KUBECONFIG=kubeconfig

          helm upgrade --install myapp ${{ inputs.helm-chart }} \
            --namespace ${{ inputs.namespace }} \
            --create-namespace \
            --set image=${{ inputs.image }} \
            --set environment=${{ inputs.environment }} \
            --set replicas=${{ inputs.replicas }} \
            --wait --timeout=10m

          URL="https://${{ inputs.environment }}.myapp.com"
          echo "url=$URL" >> $GITHUB_OUTPUT

      - name: Verify deployment
        run: |
          export KUBECONFIG=kubeconfig
          kubectl rollout status deployment/myapp -n ${{ inputs.namespace }}
          kubectl get pods -l app=myapp -n ${{ inputs.namespace }}

      - name: Run smoke tests
        run: |
          URL="${{ steps.deploy.outputs.url }}"
          curl -f $URL/health
          curl -f $URL/api/version

      - name: Notify Slack
        if: always() && secrets.slack-webhook
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.slack-webhook }}
          fields: repo,message,commit,author,action,eventName,ref,workflow
```

### Using Reusable Workflows

**.github/workflows/main.yml**:

```yaml
name: Main Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    uses: ./.github/workflows/build.yml
    with:
      node-version: '18'
      push: ${{ github.event_name != 'pull_request' }}
    secrets:
      registry-password: ${{ secrets.GITHUB_TOKEN }}

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: build
    uses: ./.github/workflows/deploy.yml
    with:
      environment: staging
      image: ${{ needs.build.outputs.image }}
      replicas: 2
    secrets:
      kubeconfig: ${{ secrets.KUBECONFIG_STAGING }}
      slack-webhook: ${{ secrets.SLACK_WEBHOOK }}

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build
    uses: ./.github/workflows/deploy.yml
    with:
      environment: production
      image: ${{ needs.build.outputs.image }}
      replicas: 5
    secrets:
      kubeconfig: ${{ secrets.KUBECONFIG_PRODUCTION }}
      slack-webhook: ${{ secrets.SLACK_WEBHOOK }}
```

## Custom Actions

### TypeScript Action Example

**action.yml**:

```yaml
name: 'Deploy to Kubernetes'
description: 'Deploy application to Kubernetes cluster'
inputs:
  kubeconfig:
    description: 'Kubernetes config file content'
    required: true
  namespace:
    description: 'Kubernetes namespace'
    required: true
    default: 'default'
  image:
    description: 'Container image to deploy'
    required: true
  replicas:
    description: 'Number of replicas'
    required: false
    default: '1'
outputs:
  deployment-url:
    description: 'Deployment URL'
    value: ${{ steps.deploy.outputs.url }}
runs:
  using: 'node20'
  main: 'dist/index.js'
```

**src/main.ts**:

```typescript
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fs from 'fs';
import * as path from 'path';

async function run(): Promise<void> {
  try {
    // Get inputs
    const kubeconfig = core.getInput('kubeconfig', { required: true });
    const namespace = core.getInput('namespace', { required: true });
    const image = core.getInput('image', { required: true });
    const replicas = parseInt(core.getInput('replicas') || '1');

    // Write kubeconfig to file
    const kubeconfigPath = path.join(process.env.HOME || '/tmp', '.kube', 'config');
    fs.mkdirSync(path.dirname(kubeconfigPath), { recursive: true });
    fs.writeFileSync(kubeconfigPath, Buffer.from(kubeconfig, 'base64'));

    // Set KUBECONFIG environment variable
    core.exportVariable('KUBECONFIG', kubeconfigPath);

    // Create deployment manifest
    const deploymentManifest = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: ${namespace}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: ${image}
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
`;

    // Write manifest to file
    const manifestPath = '/tmp/deployment.yaml';
    fs.writeFileSync(manifestPath, deploymentManifest);

    // Create namespace if it doesn't exist
    await exec.exec('kubectl', [
      'create',
      'namespace',
      namespace,
      '--dry-run=client',
      '-o',
      'yaml',
    ]);
    await exec.exec('kubectl', ['apply', '-f', '-'], {
      input: Buffer.from(`apiVersion: v1\nkind: Namespace\nmetadata:\n  name: ${namespace}`),
    });

    // Apply deployment
    await exec.exec('kubectl', ['apply', '-f', manifestPath]);

    // Wait for rollout
    await exec.exec('kubectl', [
      'rollout',
      'status',
      `deployment/myapp`,
      '-n',
      namespace,
      '--timeout=300s',
    ]);

    // Get service URL (assuming service exists)
    let serviceUrl = '';
    try {
      const output = await exec.getExecOutput('kubectl', [
        'get',
        'service',
        'myapp',
        '-n',
        namespace,
        '-o',
        'jsonpath={.status.loadBalancer.ingress[0].hostname}',
      ]);
      serviceUrl = `https://${output.stdout.trim()}`;
    } catch (error) {
      core.warning('Could not get service URL');
      serviceUrl = `https://${namespace}.myapp.com`;
    }

    // Set outputs
    core.setOutput('deployment-url', serviceUrl);
    core.info(`Deployment successful! URL: ${serviceUrl}`);
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}

run();
```

### Composite Action Example

**action.yml**:

```yaml
name: 'Node.js Setup and Test'
description: 'Setup Node.js environment and run tests'
inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '18'
  registry-url:
    description: 'NPM registry URL'
    required: false
    default: 'https://registry.npmjs.org/'
  run-tests:
    description: 'Whether to run tests'
    required: false
    default: 'true'
  run-lint:
    description: 'Whether to run linting'
    required: false
    default: 'true'
outputs:
  test-results:
    description: 'Test results'
    value: ${{ steps.test.outputs.results }}
runs:
  using: 'composite'
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        registry-url: ${{ inputs.registry-url }}
        cache: 'npm'

    - name: Install dependencies
      shell: bash
      run: npm ci

    - name: Run linting
      if: inputs.run-lint == 'true'
      shell: bash
      run: npm run lint

    - name: Run tests
      if: inputs.run-tests == 'true'
      id: test
      shell: bash
      run: |
        npm test
        echo "results=passed" >> $GITHUB_OUTPUT
```

## Performance Optimization

### Build Optimization

```yaml
name: Optimized Build Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          # Shallow clone for faster checkout
          fetch-depth: 1

      - name: Setup Node.js with caching
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Cache node_modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm ci --prefer-offline --no-audit

      - name: Cache build artifacts
        uses: actions/cache@v3
        with:
          path: |
            dist/
            .next/cache/
            .webpack-cache/
          key: ${{ runner.os }}-build-${{ hashFiles('**/*.js', '**/*.ts', '**/*.json') }}
          restore-keys: |
            ${{ runner.os }}-build-

      - name: Build with caching
        run: npm run build
        env:
          # Enable build caching
          WEBPACK_CACHE: true
          NEXT_CACHE: true

      - name: Docker layer caching
        uses: docker/setup-buildx-action@v3
        with:
          driver-opts: image=moby/buildkit:buildx-stable-1

      - name: Build Docker image with cache
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          tags: myapp:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            BUILDKIT_INLINE_CACHE=1

  parallel-jobs:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        job: [lint, test, security-scan, build-docs]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run job
        run: npm run ${{ matrix.job }}
```

This comprehensive GitHub Actions knowledge base provides production-ready templates and patterns for modern CI/CD
workflows, covering everything from basic patterns to advanced optimization techniques.
