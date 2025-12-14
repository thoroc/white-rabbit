---
description: Generate deployment documentation and procedures
agent: general
subtask: true
type: command
category: Development
tags:
    - command
    - deploy
    - docs
    - generate
    - deployment
version: 1.0.0
last_updated: 2025-11-19
---

# Deployment Documentation Generation

Create comprehensive deployment documentation by analyzing the infrastructure, CI/CD processes, and deployment procedures.

## Deployment Analysis

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` for detailed guidance on:

- Section 1: Project Analysis Approach
- Section 4: Checklist Integration
- Section 5: Knowledge Base Resources

### Deployment-Specific Analysis Focus

Run these specific analysis commands from `.opencode/task/project-context.md`:

- Container and Orchestration Detection
- CI/CD Platform Detection
- Infrastructure as Code Detection
- Deployment Configuration

For comprehensive deployment analysis, load `.opencode/task/dev/deployment-strategy.md`.

## Deployment Documentation Requirements

**CHECKLIST REFERENCE**: `.opencode/checklist/deployment-documentation.md` (183+ requirements)

**See**: `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 4: Checklist Integration for usage guidance.

## Deployment Focus

$ARGUMENTS

## Instructions

**Load and use the checklist reference above as your primary guide**. Work through each section systematically to ensure complete coverage:

1. **Follow the Checklist**: Address every ✅ item in the deployment documentation checklist
2. **Quality Standards**: Meet all procedure clarity and operational readiness requirements
3. **Specialized Sections**: Include relevant specialized sections (Cloud, Container, Serverless, etc.)
4. **Emergency Procedures**: Ensure incident response and critical operations are covered

**Deployment Focus Areas** (adapt based on detected technologies):

- Infrastructure deployment procedures (IaC, containers, serverless)
- Application deployment strategies (rolling, blue-green, canary)
- Environment management (dev, staging, production)
- CI/CD pipeline configuration and troubleshooting
- Database deployment and migration procedures
- Monitoring, logging, and alerting setup
- Security deployment (certificates, secrets, access controls)
- Rollback and disaster recovery procedures

## Existing Documentation Discovery

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2: Existing Documentation Discovery for complete guidance.

**Quick Deployment Documentation Search**:

!`echo "## Searching for existing deployment documentation"; find . -type f \( -name "*deploy*.md" -o -name "*deployment*.md" -o -name "*ops*.md" -o -name "*operations*.md" -o -name "*runbook*.md" \) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" ! -path "*/build/*" ! -path "*/dist/*" 2>/dev/null | sort`

**Common locations:**

- `./docs/deployment.md` or `./DEPLOYMENT.md`
- `./docs/operations.md` or `./docs/runbook.md`
- `./ops/` or `./docs/ops/` (operations guides)

**CRITICAL**: Deployment documentation often contains production-critical information. Be extra careful to preserve all existing procedures and contacts.

## Output Requirements

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 3: Output Requirements for detailed guidelines.

**Default output location** (if no existing docs found): `./docs/deployment.md`

Create documentation that enables operations teams to deploy, maintain, and troubleshoot the system effectively. Include emergency procedures and contact information with proper markdown formatting.
