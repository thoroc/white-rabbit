---
title: Deployment Strategy Task
description: Analyze deployment strategies, CI/CD pipelines, containerization, and operational infrastructure
type: task
category: Operations
version: 1.0.0
tags:
  - cicd
  - deployment
  - strategy
  - docker
  - kubernetes
  - containers
  - pipeline
mode: task
temperature: 0.3
last_updated: 2025-11-19
estimated_duration: 3-5 minutes
---

This task analyzes deployment strategies, CI/CD pipelines, containerization, and operational concerns.

## Container and Orchestration

### Container Technology Detection

```bash
echo "=== Container and Orchestration ==="

# Docker Detection
echo "## Docker Configuration"
find . -name "Dockerfile*" -o -name "docker-compose*.yml" -o -name ".dockerignore" 2>/dev/null | sed 's/^/- /'

if [ -f "Dockerfile" ]; then
  echo "Docker build strategy:"
  grep -E "FROM|AS|COPY|RUN|CMD|ENTRYPOINT" Dockerfile | head -10 | sed 's/^/  /'
fi

# Kubernetes Detection
echo "## Kubernetes Configuration"
k8s_files=$(find . -path "*/k8s/*" -name "*.yml" -o -path "*/kubernetes/*" -name "*.yaml" 2>/dev/null)
if [ -n "$k8s_files" ]; then
  echo "$k8s_files" | head -5 | sed 's/^/- /'
  echo "Kubernetes resources:"
  echo "$k8s_files" | xargs grep "kind:" 2>/dev/null | head -5 | sed 's/^/  /'
fi

# Helm Detection
echo "## Helm Charts"
find . -name "Chart.yaml" -o -name "values.yaml" 2>/dev/null | head -3 | sed 's/^/- /'

# Service Mesh Detection
echo "## Service Mesh"
find . -name "*istio*" -o -name "*linkerd*" 2>/dev/null | head -3 | sed 's/^/- /'
```

## CI/CD Pipeline Detection

### Comprehensive CI/CD Analysis

```bash
echo "## CI/CD Platforms"

# GitHub Actions
github_workflows=$(find . -path "*/.github/workflows/*" -name "*.yml" 2>/dev/null)
if [ -n "$github_workflows" ]; then
  echo "### GitHub Actions"
  echo "$github_workflows" | sed 's/^/- /'
fi

# GitLab CI
[ -f ".gitlab-ci.yml" ] && echo "### GitLab CI" && echo "- .gitlab-ci.yml found"

# Jenkins
jenkins_files=$(find . -name "Jenkinsfile*" 2>/dev/null)
[ -n "$jenkins_files" ] && echo "### Jenkins" && echo "$jenkins_files" | sed 's/^/- /'

# Other CI/CD
find . -path "*/.circleci/*" -name "*.yml" 2>/dev/null | sed 's/^/- CircleCI: /'
find . -name ".travis.yml" 2>/dev/null | sed 's/^/- Travis CI: /'
find . -name "azure-pipelines.yml" 2>/dev/null | sed 's/^/- Azure DevOps: /'
find . -name "bitbucket-pipelines.yml" 2>/dev/null | sed 's/^/- Bitbucket: /'
```

### Build and Deployment Scripts

```bash
echo "## Build and Deployment Automation"

# Build Scripts
find . -maxdepth 2 -name "Makefile" -o -name "build.sh" -o -name "deploy.sh" 2>/dev/null | sed 's/^/- /'

# Package Scripts
if [ -f "package.json" ]; then
  echo "npm/yarn scripts:"
  grep -A 5 '"scripts"' package.json | grep -E '"(build|deploy|start|test)"' | sed 's/^/  /'
fi

# Build Tools
[ -f "pom.xml" ] && echo "- Maven (pom.xml)"
[ -f "build.gradle" ] && echo "- Gradle (build.gradle)"
[ -f "CMakeLists.txt" ] && echo "- CMake (CMakeLists.txt)"
```

## Cloud Platform Deployment

### Major Cloud Platforms

```bash
echo "## Cloud Platform Configuration"

# AWS
echo "### AWS"
find . -name "*.tf" -o -name "serverless.yml" -o -name "sam.yaml" 2>/dev/null | grep -i aws | sed 's/^/- /'
[ -f "cloudformation.yaml" ] && echo "- CloudFormation template"

# Azure
echo "### Azure"
find . -name "*.bicep" -o -name "azuredeploy.json" 2>/dev/null | sed 's/^/- /'

# Google Cloud
echo "### Google Cloud Platform"
find . -name "app.yaml" -o -name "cloudbuild.yaml" 2>/dev/null | sed 's/^/- /'

# Terraform
terraform_files=$(find . -name "*.tf" 2>/dev/null)
if [ -n "$terraform_files" ]; then
  echo "### Terraform Infrastructure"
  echo "$terraform_files" | head -5 | sed 's/^/- /'
fi

# Pulumi
[ -f "Pulumi.yaml" ] && echo "### Pulumi" && echo "- Pulumi.yaml found"

# Ansible
ansible_files=$(find . -name "*.ansible.yml" -o -path "*/playbooks/*" -name "*.yml" 2>/dev/null)
[ -n "$ansible_files" ] && echo "### Ansible" && echo "$ansible_files" | head -3 | sed 's/^/- /'
```

## Platform as a Service (PaaS)

### PaaS Configuration Detection

```bash
echo "## PaaS Platforms"

# Heroku
[ -f "Procfile" ] && echo "- Heroku (Procfile)" && cat Procfile | sed 's/^/  /'

# Cloud Foundry
[ -f "manifest.yml" ] && echo "- Cloud Foundry (manifest.yml)"

# Railway/Render/Fly.io
[ -f "railway.json" ] && echo "- Railway (railway.json)"
[ -f "render.yaml" ] && echo "- Render (render.yaml)"
[ -f "fly.toml" ] && echo "- Fly.io (fly.toml)"

# App Engine
[ -f "app.yaml" ] && echo "- Google App Engine (app.yaml)"

# Elastic Beanstalk
[ -d ".ebextensions" ] && echo "- AWS Elastic Beanstalk (.ebextensions/)"
```

## Serverless Deployment

### Serverless Framework Detection

```bash
echo "## Serverless Configuration"

# Serverless Framework
[ -f "serverless.yml" ] && echo "- Serverless Framework" && grep -E "service:|provider:|functions:" serverless.yml | sed 's/^/  /'

# AWS SAM
[ -f "template.yaml" ] && grep "AWS::Serverless" template.yaml &>/dev/null && echo "- AWS SAM (template.yaml)"

# Cloud Functions
find . -name "function.json" 2>/dev/null | sed 's/^/- Azure Function: /'

# Lambda Detection
lambda_files=$(find . -name "*lambda*" -o -name "*handler*" 2>/dev/null | head -5)
[ -n "$lambda_files" ] && echo "Lambda handlers:" && echo "$lambda_files" | sed 's/^/  /'
```

## Environment and Configuration Management

### Environment Configuration

```bash
echo "## Environment Management"

# Environment Files
find . -maxdepth 2 -name ".env*" -o -name "*.env" 2>/dev/null | sed 's/^/- /'

# Config Files
find . -maxdepth 2 -name "config.yml" -o -name "config.yaml" -o -name "config.json" 2>/dev/null | sed 's/^/- /'

# Secrets Management
[ -f ".secrets.yml" ] && echo "- Secrets config (.secrets.yml)"
find . -name "*secret*" -name "*.yml" 2>/dev/null | head -3 | sed 's/^/- /'
```

## Deployment Strategy Analysis

### Strategy Recommendations

Based on detected configurations, analyze deployment approach:

**Container-Based Deployment**:
- Docker + Kubernetes: Production-ready orchestration
- Docker Compose: Development/simple production
- Helm: Package management for Kubernetes

**CI/CD Integration**:
- GitHub Actions: Native GitHub integration
- GitLab CI: Integrated with GitLab
- Jenkins: Enterprise-grade automation
- Others: CircleCI, Travis, Azure DevOps

**Cloud Deployment**:
- AWS: ECS, EKS, Lambda, Elastic Beanstalk
- Azure: AKS, Container Instances, Functions
- GCP: GKE, Cloud Run, Cloud Functions
- Multi-cloud: Terraform, Pulumi for IaC

**PaaS Options**:
- Heroku: Rapid deployment, simple scaling
- Cloud Foundry: Enterprise PaaS
- Railway/Render: Modern PaaS alternatives

**Serverless**:
- AWS Lambda, Azure Functions, Cloud Functions
- Event-driven architecture
- Pay-per-use model

## Quick Deployment Summary

Generate concise deployment summary:

```bash
echo "## Deployment Summary"

# Container Strategy
[ -f "Dockerfile" ] && echo "✓ Containerized (Docker)"
[ -d "k8s" ] || [ -d "kubernetes" ] && echo "✓ Kubernetes orchestration"
[ -f "Chart.yaml" ] && echo "✓ Helm charts available"

# CI/CD Pipeline
[ -d ".github/workflows" ] && echo "✓ GitHub Actions CI/CD"
[ -f ".gitlab-ci.yml" ] && echo "✓ GitLab CI pipeline"
[ -f "Jenkinsfile" ] && echo "✓ Jenkins pipeline"

# Cloud Platform
terraform_count=$(find . -name "*.tf" 2>/dev/null | wc -l)
[ "$terraform_count" -gt 0 ] && echo "✓ Infrastructure as Code (Terraform)"

# Deployment Type
[ -f "Procfile" ] && echo "→ PaaS deployment (Heroku)"
[ -f "serverless.yml" ] && echo "→ Serverless deployment"
[ -d "k8s" ] && echo "→ Kubernetes deployment"
[ -f "docker-compose.yml" ] && echo "→ Docker Compose deployment"
```

## Usage Instructions

Run this task to analyze deployment strategies:

```bash
# Execute all analysis sections
bash deployment-strategy.md

# Or run specific sections
bash -c "source deployment-strategy.md; container_detection"
```

## Integration with Commands

This task integrates with:
- `/deploy-docs` - Deployment documentation generation
- `/pipeline-docs` - CI/CD pipeline documentation
- `/arch-docs` - Architecture documentation (deployment section)

## Output Format

Generates structured markdown with:
- Container and orchestration configuration
- CI/CD pipeline detection
- Cloud platform identification
- PaaS and serverless configuration
- Environment and configuration management
- Deployment strategy recommendations
- Quick summary with checkmarks

All findings organized hierarchically for easy documentation integration.
