---
description: Show documentation directory structure and available commands
type: command
category: Development
tags:
    - command
    - docs
    - help
    - documentation
    - directory
version: 1.0.0
last_updated: 2025-11-19
---

# Documentation Commands Overview

This project includes custom OpenCode commands for generating comprehensive documentation.

## Available Commands

### Core Documentation Commands

#### `/api-docs` - API Documentation

- Generates detailed API documentation
- Output: ./docs/api.md
- Usage: `/api-docs` or `/api-docs "focus on authentication"`

#### `/arch-docs` - Architecture Documentation

- Generates system architecture documentation with diagrams
- Output: ./docs/architecture.md
- Usage: `/arch-docs` or `/arch-docs "focus on AWS infrastructure"`

#### `/dev-docs` - Development Documentation

- Generates development setup and workflow documentation
- Output: ./docs/development.md
- Usage: `/dev-docs` or `/dev-docs "focus on testing"`

#### `/deploy-docs` - Deployment Documentation

- Generates deployment procedures and operations documentation
- Output: ./docs/deployment.md
- Usage: `/deploy-docs` or `/deploy-docs "focus on AWS deployment"`

#### `/pipeline-docs` - Pipeline Documentation

- Generates CI/CD pipeline documentation
- Output: ./docs/pipeline.md
- Usage: `/pipeline-docs` or `/pipeline-docs "focus on Jenkins"`

#### `/onboard-docs` - Onboarding Documentation

- Generates onboarding documentation for new team members
- Output: ./docs/onboarding.md
- Usage: `/onboard-docs` or `/onboard-docs "focus on AWS setup"`

### Orchestration Commands

#### `/document` - Quick Documentation

- **Purpose:** Quick, lightweight documentation generation
- **Agent:** General (fast, straightforward)
- **Output:** Typically README.md, single document focus
- **Use when:** Need quick turnaround, simple documentation
- Usage: `/document` or `/document "specific focus"`

#### `/documentalist` - Comprehensive Documentation

- **Purpose:** Complete documentation suites with quality review
- **Agent:** Documentalist (specialized, orchestrates other commands)
- **Output:** Multiple coordinated documents (API, architecture, deployment, etc.)
- **Use when:** Need professional, production-ready complete documentation
- Usage: `/documentalist` or `/documentalist "complete suite"`

#### `/generate-docs-strict` - Strict Format Documentation

- Generates all documentation with strict formatting standards
- Follows comprehensive checklists exactly
- Creates complete documentation suite
- Usage: `/generate-docs-strict`

## Standard Documentation Structure

```
project-root/
├── README.md                    # High-level project overview (maintained separately)
└── docs/
    ├── api.md                   # API documentation
    ├── architecture.md          # System architecture
    ├── deployment.md            # Deployment procedures
    ├── development.md           # Development setup and workflows
    ├── onboarding.md            # New team member onboarding
    └── pipeline.md              # CI/CD pipeline documentation
```

## Command Selection Guide

### Quick Reference

| Scenario                     | Command                 | Why                                 |
| ---------------------------- | ----------------------- | ----------------------------------- |
| Need API docs only           | `/api-docs`             | Fast, focused on APIs               |
| Need architecture overview   | `/arch-docs`            | System design and diagrams          |
| Need development setup       | `/dev-docs`             | Setup and workflows                 |
| Need deployment procedures   | `/deploy-docs`          | Operations and deployment           |
| Need pipeline documentation  | `/pipeline-docs`        | CI/CD workflows                     |
| Need onboarding guide        | `/onboard-docs`         | New team member onboarding          |
| Quick project README         | `/document`             | Fast, general agent, single doc     |
| Complete documentation suite | `/documentalist`        | Specialized agent, orchestrates all |
| Strict format requirements   | `/generate-docs-strict` | Comprehensive with strict standards |

### Recommended Workflows

#### New Project Documentation

1. `/documentalist` - Creates complete documentation suite
2. Review and iterate on specific areas with targeted commands

#### Update Existing Documentation

1. `/dev-docs` - Update development setup
2. `/api-docs` - Update API documentation
3. `/arch-docs` - Update architecture if structure changed
4. `/deploy-docs` - Update deployment if infrastructure changed
5. `/pipeline-docs` - Update CI/CD documentation

#### Targeted Updates

- API changed? → `/api-docs "focus on new endpoints"`
- New AWS service? → `/arch-docs "focus on AWS infrastructure"`
- New deployment target? → `/deploy-docs "focus on Kubernetes"`
- Jenkins pipeline updated? → `/pipeline-docs "focus on Jenkins changes"`
- New team member joining? → `/onboard-docs "focus on quick start"`

## Additional Resources

### Mermaid Diagram Reference

- See `.opencode/knowledge-base/mermaid-diagrams.md` for diagram examples and best practices
- Includes templates for all common diagram types
- Referenced automatically by all documentation commands

### Documentation Checklists

Commands use comprehensive checklists for quality assurance:

- `.opencode/checklist/api-documentation.md` (150+ requirements)
- `.opencode/checklist/architecture-documentation.md` (161+ requirements)
- `.opencode/checklist/deployment-documentation.md` (183+ requirements)
- `.opencode/checklist/development-documentation.md` (181+ requirements)
- `.opencode/checklist/onboarding-documentation.md` (150+ requirements)

## Usage Tips

1. All commands automatically create the ./docs directory if it doesn't exist
2. Commands support arguments for specific focus areas (pass in quotes)
3. README.md stays in project root, everything else goes to ./docs
4. Commands use shell integration to analyze current project state
5. Output includes proper markdown formatting and structure
6. **All diagrams use Mermaid syntax** - see `.opencode/knowledge-base/mermaid-diagrams.md` for examples
7. Use `/docs-help` anytime to see this overview

Run any command with `/command-name` in the OpenCode TUI.
