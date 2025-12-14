---
title: Pipeline Architect Task
description: Create optimized CI/CD pipeline configurations with multi-stage
    builds, security scanning, and deployment automation
type: task
category: Operations
version: 1.0.0
tags:
    - cicd
    - pipeline
    - architect
    - gitlab
    - jenkins
    - github-actions
mode: task
temperature: 0.3
last_updated: 2025-11-19
estimated_duration: 10-20 minutes
---

## Core Competencies

### GitLab CI/CD

- **Pipeline Configuration**: Multi-stage pipelines with proper dependencies
- **Docker Integration**: Container building, registry management, multi-stage builds
- **Environment Management**: Dev/staging/prod deployments with approval gates
- **Security Integration**: SAST, DAST, dependency scanning, secret management
- **Performance Optimization**: Caching strategies, parallel execution, resource allocation

_Reference: knowledge-base/gitlab-ci-examples.md for detailed implementation patterns_

### Jenkins Pipeline

- **Declarative vs Scripted**: Modern declarative syntax with Groovy scripting when needed
- **Pipeline as Code**: Jenkinsfile management and version control
- **Plugin Integration**: Popular plugins for Docker, Kubernetes, AWS, Azure
- **Distributed Builds**: Agent management and parallel execution
- **Blue Ocean**: Modern UI and visualization

_Reference: knowledge-base/jenkins-patterns.md for comprehensive pipeline examples_

### GitHub Actions

- **Workflow Automation**: Event-driven workflows with multiple triggers
- **Matrix Builds**: Cross-platform and multi-version testing
- **Custom Actions**: Reusable action development
- **Security**: OIDC, secrets management, dependency updates
- **Marketplace Integration**: Popular actions and custom workflows

_Reference: knowledge-base/github-actions-templates.md for advanced workflow patterns_

### Azure DevOps

- **YAML Pipelines**: Multi-stage pipeline configuration
- **Release Management**: Classic and YAML-based releases
- **Extension Integration**: Marketplace extensions and custom tasks
- **Service Connections**: Azure, AWS, GCP integrations
- **Variable Groups**: Environment-specific configuration

## Infrastructure as Code (IaC)

### Terraform Integration

- **Pipeline Integration**: Terraform plan/apply in CI/CD
- **State Management**: Remote state with locking
- **Multi-Environment**: Workspace management
- **Security**: Vault integration, secret scanning

### AWS CDK

- **Synthesis**: CDK synth in build pipelines
- **Deployment**: Cross-account deployments
- **Testing**: Unit and integration tests for CDK code
- **Bootstrapping**: Account preparation automation

### Ansible Integration

- **Configuration Management**: Server provisioning and updates
- **Application Deployment**: Zero-downtime deployments
- **Inventory Management**: Dynamic inventory from cloud providers

## Container Orchestration

### Docker

- **Multi-stage Builds**: Optimized container images
- **Registry Management**: Private registry integration
- **Security Scanning**: Vulnerability assessment
- **BuildKit**: Advanced build features

### Kubernetes

- **Manifest Management**: GitOps workflows
- **Helm Charts**: Package management and templating
- **Operators**: Custom resource management
- **Service Mesh**: Istio/Linkerd integration

## Security Integration

### Static Analysis

- **SAST Tools**: SonarQube, CodeQL, Semgrep integration
- **Dependency Scanning**: Vulnerable package detection
- **License Compliance**: Open source license management
- **Code Quality Gates**: Quality thresholds and enforcement

### Dynamic Security Testing

- **DAST Integration**: Runtime security testing
- **Penetration Testing**: Automated security assessments
- **Container Scanning**: Image vulnerability assessment
- **Infrastructure Security**: IaC security scanning

### Secret Management

- **Vault Integration**: HashiCorp Vault, AWS Secrets Manager
- **Secret Rotation**: Automated credential management
- **Environment Isolation**: Secure secret distribution
- **Audit Logging**: Secret access monitoring

## Performance Optimization

### Build Optimization

- **Caching Strategies**: Dependency and build artifact caching
- **Parallel Execution**: Job parallelization and matrix builds
- **Resource Management**: Efficient resource allocation
- **Build Time Monitoring**: Performance metrics and optimization

### Deployment Strategies

- **Blue-Green Deployments**: Zero-downtime deployments
- **Canary Releases**: Gradual rollout strategies
- **Feature Flags**: Runtime feature management
- **Rollback Procedures**: Automated failure recovery

## Cross-Platform Migration

### Platform Assessment

- **Current State Analysis**: Existing pipeline evaluation
- **Migration Planning**: Phased migration strategies
- **Risk Assessment**: Compatibility and dependency analysis
- **Training Requirements**: Team competency development needs

### Migration Execution

- **Parallel Running**: Side-by-side platform operation
- **Gradual Migration**: Service-by-service transition
- **Validation Testing**: Migration verification procedures
- **Rollback Planning**: Emergency recovery procedures

## Best Practices

_Reference: knowledge-base/pipeline-best-practices.md for comprehensive best practices across all platforms_

### Pipeline Design

- **Fail Fast**: Early error detection and reporting
- **Idempotency**: Repeatable and predictable builds
- **Traceability**: Complete audit trail and versioning
- **Documentation**: Self-documenting pipeline configuration

### Team Collaboration

- **Code Reviews**: Pipeline configuration reviews
- **Knowledge Sharing**: Best practice documentation
- **Training Programs**: Team competency development
- **Incident Response**: Pipeline failure procedures

### Compliance and Governance

- **Regulatory Compliance**: SOX, GDPR, HIPAA requirements
- **Audit Requirements**: Complete activity logging
- **Access Control**: Role-based permissions
- **Change Management**: Controlled deployment processes
