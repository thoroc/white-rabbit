---
title: Pipeline Documentation Checklist
description: Ensure comprehensive CI/CD pipeline documentation with proper coverage of all stages, jobs, and deployment processes
type: checklist
category: documentation
version: 1.0.0
tags:
    - checklist
    - documentation
    - pipeline
last_updated: 2025-11-19
---

# Pipeline Documentation Checklist

Use this checklist to ensure comprehensive CI/CD pipeline documentation. Each section should be included and properly documented for all detected pipelines and flows.

## 📋 Purpose and Usage

### Purpose

This checklist ensures that all CI/CD pipelines in the repository are thoroughly documented, enabling developers and operators to understand, modify, troubleshoot, and maintain automated workflows effectively.

### When to Use

- Generating initial pipeline documentation for a project
- Updating existing pipeline documentation after workflow changes
- Auditing pipeline documentation completeness
- Onboarding new team members to CI/CD processes

### How to Use

1. Generate both summary and detailed documentation (see structure below)
2. Work through this checklist for each document type
3. Verify all required sections are present and complete
4. Ensure all detected pipelines have detailed documentation files

---

## ✅ 1. Documentation Structure Requirements

### Summary Document (`./docs/pipeline-summary.md`)

- [ ] **Short Description**: High-level description of repository's CI/CD setup
- [ ] **Detected Platforms**: List all detected platforms (GitHub Actions, GitLab CI, Jenkins, etc.)
- [ ] **Pipeline Table/List**: Table or list of detected pipelines with:
    - [ ] Pipeline name
    - [ ] One-line description
    - [ ] Key triggers
    - [ ] Link to detailed documentation (relative path)
- [ ] **High-Level Diagram**: Mermaid diagram showing pipeline overview and environment promotion
- [ ] **Quick Troubleshooting**: Pointers to common issues and solutions
- [ ] **Important Conventions**: Team conventions and best practices

### Detailed Per-Pipeline Documents (`./docs/pipelines/<safe-pipeline-name>.md`)

- [ ] **Individual File Per Pipeline**: Each detected pipeline has its own markdown file
- [ ] **Safe Naming Convention**: Filenames use kebab-case (lowercase, digits, hyphens only)
- [ ] **Unique Filenames**: No duplicate names (append numeric suffix if needed)
- [ ] **Directory Structure**: Files saved under `./docs/pipelines/` directory

---

## ✅ 2. Pipeline Overview Section (Each Detailed Doc)

- [ ] **Pipeline Name**: Clear, descriptive name
- [ ] **Purpose**: What this pipeline accomplishes
- [ ] **Platform**: CI/CD platform used (Jenkins, GitLab CI, GitHub Actions, etc.)
- [ ] **Configuration Location**: Where the config file lives in the repository
- [ ] **Last Updated**: When this documentation was last updated
- [ ] **Owner/Maintainer**: Team or individual responsible

---

## ✅ 3. Flow Diagram Section

- [ ] **Full Flow Diagram**: Mermaid diagram showing complete pipeline flow
- [ ] **Stages Visualization**: All stages/phases clearly shown
- [ ] **Job Dependencies**: Dependencies between jobs illustrated
- [ ] **Parallelization**: Parallel execution paths indicated
- [ ] **Environment Promotion**: Environment progression shown (dev → staging → prod)
- [ ] **Proper Mermaid Syntax**: Diagram uses valid Mermaid syntax in ```mermaid blocks
- [ ] **Diagram Renders Correctly**: Verified diagram displays without errors

---

## ✅ 4. Stages and Jobs Section

### For Each Stage/Job

- [ ] **Stage/Job Name**: Clear identification
- [ ] **Purpose**: What this stage/job does
- [ ] **Commands/Scripts**: Actual commands executed
- [ ] **Important Timeouts**: Timeout values if configured
- [ ] **Artifacts Produced**: What artifacts are created
- [ ] **Artifacts Consumed**: Dependencies on previous artifacts
- [ ] **Failure Handling**: What happens on failure

---

## ✅ 5. Triggers & Events Section

- [ ] **Trigger Types**: All ways pipeline can be initiated
- [ ] **Push Events**: Which branches trigger on push
- [ ] **Pull Request Events**: PR triggers and conditions
- [ ] **Schedule**: Cron schedules if configured
- [ ] **Tag Events**: Tag patterns that trigger pipeline
- [ ] **Manual Triggers**: How to manually trigger
- [ ] **Webhook Triggers**: External webhooks if configured
- [ ] **Trigger Filters**: Branch patterns, path filters, conditions

---

## ✅ 6. Configuration & Overrides Section

### Configuration Details

- [ ] **Configuration Files**: List all config files
- [ ] **Example Snippets**: Key configuration examples
- [ ] **Customization Guide**: How to customize for different scenarios
- [ ] **Include/Extends Patterns**: Reusable configuration patterns (GitLab CI)
- [ ] **Shared Libraries**: Shared pipeline libraries used (Jenkins)
- [ ] **Reusable Workflows**: Reusable workflow actions (GitHub Actions)
- [ ] **Variables Definition**: Where variables are defined
- [ ] **Conditional Execution**: Rules for conditional job execution

---

## ✅ 7. Runners/Agents/Executors Section

### Jenkins

- [ ] **Agent/Node Configuration**: Agent labels and selection
- [ ] **Executor Requirements**: Number of executors needed
- [ ] **Docker Agents**: Docker images used for agents
- [ ] **Cloud Agents**: Dynamic cloud agent configuration

### GitLab CI

- [ ] **Runner Tags**: Required runner tags
- [ ] **Runner Type**: Shared, group, or project-specific
- [ ] **Docker Images**: Images specified for jobs
- [ ] **Kubernetes Executors**: K8s runner configuration if used

### GitHub Actions

- [ ] **Runner Labels**: Self-hosted or GitHub-hosted
- [ ] **Runner Requirements**: OS, architecture requirements
- [ ] **Runner Images**: Container images for jobs
- [ ] **Runner Groups**: Organization/enterprise runner groups

---

## ✅ 8. Build/Test/Package Section

- [ ] **Build Commands**: Complete build command documentation
- [ ] **Test Execution**: How tests are run
- [ ] **Test Coverage**: Coverage collection and reporting
- [ ] **Coverage Gating**: Minimum coverage thresholds
- [ ] **Package Creation**: Artifact/package creation process
- [ ] **Artifact Paths**: Where artifacts are stored
- [ ] **Artifact Naming**: Naming conventions for artifacts
- [ ] **Build Matrix**: Matrix build configurations if used

---

## ✅ 9. Secrets, Variables & Vaults Section

### Secrets Management

- [ ] **Secret Storage**: Where secrets are stored (vault, platform secrets, etc.)
- [ ] **Secret Names**: List of required secrets
- [ ] **Provisioning Process**: How to add/update secrets
- [ ] **Access Control**: Who can access secrets
- [ ] **Rotation Policy**: Secret rotation requirements

### Variables

- [ ] **Environment Variables**: Required environment variables
- [ ] **Pipeline Variables**: Pipeline-specific variables
- [ ] **Group/Organization Variables**: Shared variables
- [ ] **Variable Precedence**: Order of variable resolution
- [ ] **Sensitive Variables**: Which variables are sensitive

---

## ✅ 10. Deployment & Environment Promotion Section

### Environments

- [ ] **Environment List**: All deployment environments (dev, staging, prod)
- [ ] **Environment Configuration**: Environment-specific settings
- [ ] **Promotion Process**: How code moves between environments
- [ ] **Approval Gates**: Manual approval requirements
- [ ] **Deployment Strategy**: Rolling, blue-green, canary, etc.

### Rollback

- [ ] **Rollback Procedure**: Step-by-step rollback process
- [ ] **Rollback Triggers**: When to rollback
- [ ] **Version Tracking**: How versions are tracked
- [ ] **Rollback Testing**: How rollbacks are tested

---

## ✅ 11. Artifacts & Registry Section

- [ ] **Artifact Types**: Types of artifacts produced (Docker images, packages, binaries)
- [ ] **Registry Location**: Where artifacts are published
- [ ] **Versioning Strategy**: How artifacts are versioned
- [ ] **Retention Policy**: How long artifacts are kept
- [ ] **Artifact Promotion**: How artifacts move between registries
- [ ] **Access Control**: Who can access/pull artifacts
- [ ] **Tagging Strategy**: Tag naming conventions

---

## ✅ 12. Monitoring, Notifications & Gates Section

### Monitoring

- [ ] **Pipeline Monitoring**: Where pipeline execution is monitored
- [ ] **Metrics Collected**: Key metrics tracked
- [ ] **Dashboards**: Links to monitoring dashboards
- [ ] **Alerting**: Alert conditions and channels

### Notifications

- [ ] **Notification Channels**: Slack, email, etc.
- [ ] **Notification Triggers**: When notifications are sent
- [ ] **Notification Recipients**: Who receives notifications
- [ ] **Notification Format**: What information is included

### Quality Gates

- [ ] **Gate Types**: Code quality, security, test coverage gates
- [ ] **Gate Thresholds**: Pass/fail criteria
- [ ] **Gate Enforcement**: Blocking vs. warning gates
- [ ] **Gate Override**: Who can override gates and how

---

## ✅ 13. Troubleshooting Section

### Common Failures

- [ ] **Failure Scenarios**: Most common pipeline failures
- [ ] **Symptoms**: How failures manifest
- [ ] **Root Causes**: Common root causes
- [ ] **Resolution Steps**: Step-by-step remediation

### Debugging

- [ ] **Log Locations**: Where logs are stored
- [ ] **Debug Mode**: How to enable debug output
- [ ] **Local Testing**: How to test pipeline locally
- [ ] **Common Gotchas**: Known issues and workarounds

### Emergency Procedures

- [ ] **Pipeline Disable**: How to disable a pipeline
- [ ] **Emergency Rollback**: Emergency rollback procedure
- [ ] **Incident Contacts**: Who to contact for help
- [ ] **Escalation Path**: Escalation process

---

## ✅ 14. Security and Scanning Section

### Security Scanning

- [ ] **SCA (Software Composition Analysis)**: Dependency scanning tools
- [ ] **SAST (Static Analysis)**: Static code analysis tools
- [ ] **DAST (Dynamic Analysis)**: Dynamic testing if applicable
- [ ] **Container Scanning**: Docker image vulnerability scanning
- [ ] **Secret Scanning**: Secret detection tools

### Security Reports

- [ ] **Report Location**: Where security reports are stored
- [ ] **Report Format**: Format of security reports
- [ ] **Failure Thresholds**: When security issues fail the pipeline
- [ ] **Remediation Process**: How to address security findings

### Compliance

- [ ] **Compliance Checks**: Regulatory compliance scanning
- [ ] **Audit Logging**: What is logged for audit purposes
- [ ] **Policy Enforcement**: What policies are enforced

---

## ✅ 15. Examples and Snippets Section

- [ ] **Workflow Fragments**: Reusable pipeline fragments
- [ ] **Job Examples**: Complete job examples
- [ ] **Common Patterns**: Frequently used patterns
- [ ] **Mermaid Diagram Examples**: Diagram code snippets
- [ ] **Testing Examples**: How to test pipeline changes
- [ ] **Custom Scripts**: Location and purpose of custom scripts

---

## ✅ 16. References Section

- [ ] **Template Links**: Links to pipeline templates
- [ ] **Shared Libraries**: Links to shared library documentation
- [ ] **Related Documentation**: Links to related docs in repo
- [ ] **Platform Documentation**: Links to official platform docs
- [ ] **Team Guidelines**: Links to team-specific guidelines
- [ ] **Best Practices**: Links to best practice documentation

---

## 🎯 Quality Standards

### Documentation Quality

- [ ] **Clarity**: All sections written clearly and concisely
- [ ] **Completeness**: No significant gaps in documentation
- [ ] **Accuracy**: All commands and configurations verified
- [ ] **Current**: Documentation reflects current pipeline state
- [ ] **Examples**: Working examples provided where helpful
- [ ] **Cross-References**: Proper links between related sections

### Technical Quality

- [ ] **Mermaid Diagrams**: All diagrams render correctly
- [ ] **Code Blocks**: All code blocks have proper syntax highlighting
- [ ] **Commands**: All commands tested and working
- [ ] **Paths**: All file paths verified
- [ ] **URLs**: All external links working

### Usability

- [ ] **Navigation**: Clear section headers and structure
- [ ] **Searchable**: Key terms easily searchable
- [ ] **Self-Service**: Documentation enables self-service troubleshooting
- [ ] **Progressive Disclosure**: Basic info first, details available

---

## 📊 Platform-Specific Sections

### For Jenkins Pipelines

- [ ] **Jenkinsfile Location**: Path to Jenkinsfile
- [ ] **Pipeline Type**: Scripted vs. declarative
- [ ] **Shared Libraries**: Libraries used and versions
- [ ] **Plugins**: Required Jenkins plugins
- [ ] **Credentials**: Credential IDs used
- [ ] **Post-Build Actions**: What happens after build

### For GitLab CI

- [ ] **`.gitlab-ci.yml` Location**: Config file path
- [ ] **Pipeline Architecture**: Stages and job organization
- [ ] **Include Strategy**: External config includes
- [ ] **Extends Pattern**: Job template usage
- [ ] **Cache Strategy**: Cache keys and paths
- [ ] **Runner Configuration**: Runner-specific settings

### For GitHub Actions

- [ ] **Workflow Files**: `.github/workflows/` file list
- [ ] **Workflow Triggers**: Events and filters
- [ ] **Action Versions**: Pinned action versions
- [ ] **Matrix Strategies**: Matrix configuration details
- [ ] **Reusable Workflows**: Workflow calls and inputs
- [ ] **Environments**: Environment protection rules

---

## 🔍 Review Checklist

Before considering pipeline documentation complete:

### Summary Document Review

- [ ] Summary document exists at `./docs/pipeline-summary.md`
- [ ] All detected pipelines listed in summary
- [ ] Links to detailed docs working
- [ ] High-level diagram included and rendering
- [ ] Quick troubleshooting guide provided
- [ ] Summary document follows standard structure template

### Detailed Documentation Review

- [ ] `./docs/pipelines/` directory created
- [ ] One detailed document per pipeline
- [ ] All 16 sections addressed in each detailed doc
- [ ] All diagrams rendering correctly
- [ ] All code examples valid
- [ ] All links working

### Cross-Cutting Concerns

- [ ] Consistent terminology across all documents
- [ ] No contradictions between summary and detailed docs
- [ ] No duplicate information (proper cross-referencing instead)
- [ ] Proper markdown formatting throughout
- [ ] All commands tested and working
- [ ] Security considerations documented

### Stakeholder Validation

- [ ] Documentation reviewed by pipeline maintainers
- [ ] Documentation tested by new team members
- [ ] Feedback incorporated
- [ ] Approval obtained from DevOps/SRE team

---

## References

- **Standard Documentation Structure**: `.opencode/template/standard-doc-structure.md`
- **Mermaid Diagrams Guide**: `.opencode/knowledge-base/mermaid-diagrams.md`
- **Jenkins Patterns**: `.opencode/knowledge-base/jenkins-patterns.md`
- **GitLab CI Examples**: `.opencode/knowledge-base/gitlab-ci-examples.md`
- **GitHub Actions Templates**: `.opencode/knowledge-base/github-actions-templates.md`
- **Pipeline Best Practices**: `.opencode/knowledge-base/pipeline-best-practices.md`
- **Pipeline Architect Task**: `.opencode/task/pipeline-architect.md`
- **Deployment Strategy Task**: `.opencode/task/deployment-strategy.md`
