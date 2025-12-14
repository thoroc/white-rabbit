---
title: Deployment Strategy Task
description: Analyze deployment strategies, CI/CD pipelines, containerization,
    and operational infrastructure
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
    - orchestration
mode: task
temperature: 0.3
last_updated: 2025-11-19
estimated_duration: 3-5 minutes
---

This consolidated task focuses on deployment strategies, CI/CD pipelines, containerization, and operational concerns without overlapping with technology stack or infrastructure detection.

## Container and Orchestration

### Container Technology Detection

```bash
# Comprehensive container and orchestration analysis
echo "=== Container and Orchestration ==="

# Docker Detection
echo "## Docker Configuration"
find . -name "Dockerfile*" -o -name "docker-compose*.yml" -o -name "docker-compose*.yaml" -o -name ".dockerignore" 2>/dev/null | sed 's/^/- /'

# Docker analysis
if [ -f "Dockerfile" ]; then
  echo "Docker build strategy:"
  grep -E "FROM|AS|COPY|ADD|RUN|CMD|ENTRYPOINT" Dockerfile | head -10 | sed 's/^/  /'
fi

if [ -f "docker-compose.yml" ]; then
  echo "Docker Compose services:"
  grep -A 1 "services:" docker-compose.yml | head -10 | sed 's/^/  /'
fi

# Kubernetes Detection
echo "## Kubernetes Configuration"
k8s_files=$(find . -name "*.k8s.yml" -o -name "*.k8s.yaml" -o -path "*/k8s/*" -name "*.yml" -o -path "*/k8s/*" -name "*.yaml" -o -path "*/kubernetes/*" -name "*.yml" -o -path "*/kubernetes/*" -name "*.yaml" 2>/dev/null)
if [ -n "$k8s_files" ]; then
  echo "$k8s_files" | head -10 | sed 's/^/- K8s config: /'
  # Analyze Kubernetes resource types
  echo "Kubernetes resources:"
  echo "$k8s_files" | xargs grep "kind:" 2>/dev/null | head -10 | sed 's/^/  /'
fi

# Helm Detection
echo "## Helm Charts"
find . -name "Chart.yaml" -o -name "values.yaml" -o -name "requirements.yaml" -o -path "*/charts/*" -name "*.yaml" 2>/dev/null | head -5 | sed 's/^/- /'
```

### Container Orchestration Analysis

```bash
# Advanced orchestration patterns
echo "## Orchestration Patterns"

# Service Mesh Detection
mesh_configs=$(find . -name "*istio*" -o -name "*linkerd*" -o -name "*consul*" -o -name "*envoy*" 2>/dev/null)
if [ -n "$mesh_configs" ]; then
  echo "Service mesh configuration:"
  echo "$mesh_configs" | head -5 | sed 's/^/- /'
fi

# Operators and CRDs
find . -name "*operator*" -o -name "*crd*" -o -name "*custom-resource*" 2>/dev/null | head -3 | sed 's/^/- Operator/CRD: /'

# Multiple container services analysis
dockerfile_count=$(find . -name "Dockerfile*" 2>/dev/null | wc -l)
if [ "$dockerfile_count" -gt 1 ]; then
  echo "Multi-service deployment detected ($dockerfile_count Dockerfiles)"
  find . -name "Dockerfile*" | head -5 | sed 's/^/- /'
fi
```

## CI/CD Pipeline Detection

### Comprehensive CI/CD Analysis

```bash
# Complete CI/CD platform and pipeline detection
echo "## CI/CD Platforms and Pipelines"

# GitHub Actions
echo "### GitHub Actions"
github_workflows=$(find . -path "*/.github/workflows/*" -name "*.yml" -o -path "*/.github/workflows/*" -name "*.yaml" 2>/dev/null)
if [ -n "$github_workflows" ]; then
  echo "$github_workflows" | sed 's/^/- Workflow: /'
  # Analyze workflow triggers and jobs
  echo "Workflow analysis:"
  echo "$github_workflows" | head -3 | xargs grep -E "on:|jobs:|name:" 2>/dev/null | head -5 | sed 's/^/  /'
fi

# GitLab CI
echo "### GitLab CI"
if [ -f ".gitlab-ci.yml" ]; then
  echo "- GitLab CI configuration found"
  grep -E "stages:|script:|image:" .gitlab-ci.yml | head -5 | sed 's/^/  /'
fi

# Jenkins
echo "### Jenkins"
jenkins_files=$(find . -name "Jenkinsfile*" -o -name "jenkins.yml" -o -name "jenkins.yaml" 2>/dev/null)
if [ -n "$jenkins_files" ]; then
  echo "$jenkins_files" | sed 's/^/- Jenkins config: /'
fi

# Other CI/CD Platforms
echo "### Other CI/CD Platforms"
find . -path "*/.circleci/*" -name "*.yml" 2>/dev/null | sed 's/^/- CircleCI: /'
find . -name ".travis.yml" 2>/dev/null | sed 's/^/- Travis CI: /'
find . -name "azure-pipelines.yml" -o -name "azure-pipelines.yaml" 2>/dev/null | sed 's/^/- Azure DevOps: /'
find . -name "bitbucket-pipelines.yml" 2>/dev/null | sed 's/^/- Bitbucket: /'
find . -name ".drone.yml" 2>/dev/null | sed 's/^/- Drone CI: /'
```

### Build and Deployment Scripts

```bash
# Build automation and deployment scripts
echo "## Build and Deployment Automation"

# Build Scripts and Tools
echo "Build automation:"
find . -maxdepth 2 -name "Makefile" -o -name "*.mk" -o -name "build.sh" -o -name "deploy.sh" -o -name "install.sh" 2>/dev/null | sed 's/^/- /'

# Package/Build Configuration Analysis
echo "Build configuration:"
if [ -f "package.json" ]; then
  echo "- npm/yarn scripts:"
  grep -A 10 '"scripts"' package.json 2>/dev/null | grep -E '"(build|deploy|start|test|ci)"' | head -5 | sed 's/^/  /'
fi

# Language-specific build tools
[ -f "pom.xml" ] && echo "- Maven build (pom.xml)"
[ -f "build.gradle" ] && echo "- Gradle build (build.gradle)"
[ -f "CMakeLists.txt" ] && echo "- CMake build (CMakeLists.txt)"
[ -f "meson.build" ] && echo "- Meson build (meson.build)"
[ -f "WORKSPACE" ] && echo "- Bazel build (WORKSPACE)"
```

## Cloud Platform Deployment

### Multi-Cloud Deployment Detection

```bash
# Cloud platform specific deployment configurations
echo "## Cloud Platform Deployments"

# AWS Deployment
echo "### AWS Deployments"
aws_deploy_files=$(find . -name "*.cf.yml" -o -name "*.cf.yaml" -o -name "*cloudformation*" -o -name "cdk.json" -o -name "*.aws-sam.yml" -o -name "template.yml" -o -name "template.yaml" -o -name "serverless.yml" -o -name "serverless.yaml" 2>/dev/null)
if [ -n "$aws_deploy_files" ]; then
  echo "$aws_deploy_files" | sed 's/^/- AWS config: /'
fi

# CDK Analysis
if [ -f "cdk.json" ]; then
  echo "AWS CDK configuration:"
  cat cdk.json | head -10 | sed 's/^/  /'
fi

# Azure Deployment
echo "### Azure Deployments"
azure_deploy_files=$(find . -name "azure-pipelines.yml" -o -name "*.bicep" -o -name "azuredeploy.json" -o -name "*.azure.yml" 2>/dev/null)
if [ -n "$azure_deploy_files" ]; then
  echo "$azure_deploy_files" | sed 's/^/- Azure config: /'
fi

# Google Cloud Deployment
echo "### Google Cloud Deployments"
gcp_deploy_files=$(find . -name "app.yaml" -o -name "cloudbuild.yaml" -o -name "*.gcp.yml" -o -name "deployment.yaml" | grep -v k8s 2>/dev/null)
if [ -n "$gcp_deploy_files" ]; then
  echo "$gcp_deploy_files" | sed 's/^/- GCP config: /'
fi
```

### Infrastructure as Code (IaC)

```bash
# Infrastructure as Code platform detection
echo "## Infrastructure as Code"

# Terraform
echo "### Terraform"
tf_files=$(find . -name "*.tf" -o -name "*.tfvars" -o -name "terraform.tfstate*" -o -name ".terraform" -type d 2>/dev/null)
if [ -n "$tf_files" ]; then
  echo "Terraform configuration found:"
  find . -name "*.tf" | head -5 | sed 's/^/- /'

  # Analyze Terraform providers
  if [ -f "main.tf" ]; then
    echo "Terraform providers:"
    grep -E "provider|terraform" main.tf | head -5 | sed 's/^/  /'
  fi
fi

# Pulumi
echo "### Pulumi"
find . -name "Pulumi.yaml" -o -name "Pulumi.*.yaml" 2>/dev/null | sed 's/^/- Pulumi config: /'

# Ansible
echo "### Ansible"
ansible_files=$(find . -name "ansible.cfg" -o -name "playbook*.yml" -o -name "inventory*" -o -name "hosts" -o -path "*/roles/*" -name "*.yml" 2>/dev/null)
if [ -n "$ansible_files" ]; then
  echo "$ansible_files" | head -5 | sed 's/^/- Ansible: /'
fi

# CloudFormation
find . -name "*cloudformation*" -o -name "*.cf.yml" -o -name "*.cf.yaml" 2>/dev/null | head -3 | sed 's/^/- CloudFormation: /'
```

## Platform as a Service (PaaS)

### PaaS Platform Detection

```bash
# Platform as a Service deployment configurations
echo "## Platform as a Service (PaaS)"

# Heroku
echo "### Heroku"
heroku_files=$(find . -name "Procfile" -o -name "app.json" -o -name "runtime.txt" 2>/dev/null)
if [ -n "$heroku_files" ]; then
  echo "$heroku_files" | sed 's/^/- Heroku config: /'
  [ -f "Procfile" ] && echo "Procfile processes:" && cat Procfile | sed 's/^/  /'
fi

# Vercel
echo "### Vercel"
find . -name "vercel.json" -o -name ".vercelignore" -o -name "now.json" 2>/dev/null | sed 's/^/- Vercel: /'

# Netlify
echo "### Netlify"
find . -name "netlify.toml" -o -name "_redirects" -o -name "_headers" 2>/dev/null | sed 's/^/- Netlify: /'

# Railway
echo "### Railway"
find . -name "railway.json" -o -name "railway.toml" 2>/dev/null | sed 's/^/- Railway: /'

# Fly.io
echo "### Fly.io"
find . -name "fly.toml" 2>/dev/null | sed 's/^/- Fly.io: /'

# Render
echo "### Render"
find . -name "render.yaml" 2>/dev/null | sed 's/^/- Render: /'
```

## Serverless Deployment

### Serverless Framework Analysis

```bash
# Serverless deployment platform detection
echo "## Serverless Deployments"

# Serverless Framework
echo "### Serverless Framework"
if [ -f "serverless.yml" ] || [ -f "serverless.yaml" ]; then
  echo "- Serverless Framework configuration found"
  serverless_file=$(find . -name "serverless.yml" -o -name "serverless.yaml" | head -1)
  echo "Service configuration:"
  grep -E "service:|provider:|functions:" "$serverless_file" | head -10 | sed 's/^/  /'
fi

# AWS SAM
echo "### AWS SAM"
sam_files=$(find . -name "template.yml" -o -name "template.yaml" -o -name "samconfig.toml" 2>/dev/null)
if [ -n "$sam_files" ]; then
  echo "$sam_files" | head -3 | sed 's/^/- SAM config: /'
fi

# Framework-specific Serverless
echo "### Framework-specific Serverless"
find . -name "zappa_settings.json" 2>/dev/null | sed 's/^/- Zappa (Python): /'
find . -name ".chalice" -type d -o -name "chalicelib" -type d 2>/dev/null | sed 's/^/- Chalice (Python): /'

# Functions Framework Detection
functions_patterns="functions-framework|@google-cloud/functions-framework|azure-functions"
grep -r -E "$functions_patterns" requirements*.txt package.json 2>/dev/null | cut -d: -f1 | sort -u | sed 's/^/- Functions Framework in: /'

# Function Detection
echo "Function files:"
find . -name "handler.*" -o -name "index.*" -o -name "main.*" -o -name "function.*" | head -10 | sed 's/^/- /'
```

## Environment and Configuration Management

### Environment Configuration Analysis

```bash
# Environment management and configuration
echo "## Environment Configuration"

# Environment Files
echo "### Environment Files"
env_files=$(find . -maxdepth 3 -name ".env*" -o -name "*.env" 2>/dev/null)
if [ -n "$env_files" ]; then
  echo "$env_files" | sed 's/^/- /'
fi

# Configuration Directories and Files
echo "### Configuration Management"
find . -maxdepth 3 -type d -name "config*" -o -name "conf*" -o -name "environments" -o -name "env" 2>/dev/null | sed 's/^/- Config dir: /'

# Environment-specific Configuration
echo "### Environment-specific Configs"
find . -name "*.prod.*" -o -name "*.dev.*" -o -name "*.staging.*" -o -name "*.test.*" -o -name "*.local.*" 2>/dev/null | head -10 | sed 's/^/- /'

# Secrets Management
echo "### Secrets Management"
secrets_patterns="vault|keybase|sops|sealed-secrets|external-secrets"
grep -r -i -E "$secrets_patterns" . --include="*.yaml" --include="*.yml" --include="*.json" 2>/dev/null | head -3 | cut -d: -f1 | sort -u | sed 's/^/- Secrets config: /'

# Configuration as Code
find . -name "*config*.yaml" -o -name "*config*.yml" -o -name "configmap*.yaml" 2>/dev/null | head -5 | sed 's/^/- Config as Code: /'
```

## Deployment Strategy Analysis

### Deployment Pattern Detection

```bash
# Advanced deployment strategy detection
echo "## Deployment Strategies"

# Blue-Green Deployment
echo "### Blue-Green Deployment"
grep -r -i -E "blue.*green|green.*blue|deployment.*strategy" . --include="*.yaml" --include="*.yml" --include="*.json" 2>/dev/null | head -3 | cut -d: -f1 | sort -u | sed 's/^/- Config: /'

# Canary Deployment
echo "### Canary Deployment"
grep -r -i -E "canary|progressive|rollout" . --include="*.yaml" --include="*.yml" 2>/dev/null | head -3 | cut -d: -f1 | sort -u | sed 's/^/- Config: /'

# Rolling Updates
echo "### Rolling Updates"
grep -r -E "rollingUpdate|updateStrategy" . --include="*.yaml" --include="*.yml" 2>/dev/null | head -3 | cut -d: -f1 | sort -u | sed 's/^/- Config: /'

# Health Checks and Readiness
echo "### Health Checks"
grep -r -E "healthcheck|readiness|liveness" . --include="*.yaml" --include="*.yml" --include="Dockerfile*" 2>/dev/null | head -5 | cut -d: -f1 | sort -u | sed 's/^/- Health config: /'
```

## Quick Deployment Summary

### Rapid Deployment Assessment

```bash
# Quick deployment strategy overview
echo "=== Quick Deployment Summary ==="

# Container Strategy
container_strategy="None"
[ -f "Dockerfile" ] && container_strategy="Docker"
[ -f "docker-compose.yml" ] && container_strategy="Docker Compose"
find . -name "*.k8s.yml" -o -name "*.k8s.yaml" 2>/dev/null | head -1 | grep -q . && container_strategy="Kubernetes"
echo "Container: $container_strategy"

# CI/CD Platform
cicd_platform="None"
[ -d ".github/workflows" ] && cicd_platform="GitHub Actions"
[ -f ".gitlab-ci.yml" ] && cicd_platform="GitLab CI"
find . -name "Jenkinsfile*" | head -1 | grep -q . && cicd_platform="Jenkins"
echo "CI/CD: $cicd_platform"

# Cloud Platform
cloud_platform="None"
[ -f "serverless.yml" ] || [ -f "cdk.json" ] && cloud_platform="AWS"
[ -f "app.yaml" ] && cloud_platform="Google Cloud"
find . -name "*.bicep" | head -1 | grep -q . && cloud_platform="Azure"
echo "Cloud: $cloud_platform"

# IaC Tool
iac_tool="None"
find . -name "*.tf" | head -1 | grep -q . && iac_tool="Terraform"
[ -f "Pulumi.yaml" ] && iac_tool="Pulumi"
find . -name "*cloudformation*" | head -1 | grep -q . && iac_tool="CloudFormation"
echo "IaC: $iac_tool"
```

## Usage Instructions

This task provides focused deployment strategy analysis:

1. **Container Strategy**: Docker, Kubernetes, and orchestration analysis
2. **CI/CD Pipelines**: Comprehensive pipeline and automation detection
3. **Cloud Deployments**: Multi-cloud platform deployment configuration
4. **IaC Analysis**: Infrastructure as Code tool and configuration detection
5. **PaaS Platforms**: Platform as a Service deployment strategies
6. **Serverless Deployment**: Function-based and serverless framework analysis
7. **Environment Management**: Configuration and environment strategy analysis
8. **Quick Assessment**: Rapid deployment strategy summary

## Integration with Commands

Commands should reference this task for deployment-specific analysis:

```markdown
## Deployment Strategy Analysis

Uses `.opencode/task/deployment-strategy.md` for comprehensive deployment strategy detection:

!`[appropriate deployment analysis command based on documentation needs]`
```

This focused approach provides comprehensive deployment strategy insight without overlapping with technology stack or infrastructure detection.
