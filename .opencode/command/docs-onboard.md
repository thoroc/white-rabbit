---
description: Generate onboarding documentation for new team members
agent: general
subtask: true
type: command
category: Development
tags:
  - command
  - onboard
  - docs
  - generate
  - onboarding
version: 1.0.0
last_updated: 2025-11-19
---

# Onboarding Documentation Generation

Create comprehensive onboarding documentation to help new team members get started quickly with the project, understand the team culture, and become productive contributors.

## Onboarding Analysis

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` for detailed guidance on:

- Section 1: Project Analysis Approach
- Section 4: Checklist Integration
- Section 5: Knowledge Base Resources

### Onboarding-Specific Analysis Focus

Run these specific analysis commands from `.opencode/task/project-context.md`:

- Git Repository Information
- Project Configuration Files
- Technology Stack Summary

For team and communication analysis, check:

- CODEOWNERS file
- README.md and docs/ for team contact information
- .github/, .gitlab/ for team workflows

## Onboarding Documentation Requirements

**CHECKLIST REFERENCE**: `.opencode/checklist/onboarding-documentation.md` (150+ requirements)

**See**: `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 4: Checklist Integration for usage guidance.

## Onboarding Focus

$ARGUMENTS

## Instructions

**Load and use the checklist reference above as your primary guide**. Work through each section systematically to ensure complete coverage:

1. **Follow the Checklist**: Address every item in the onboarding documentation checklist
2. **Quality Standards**: Meet all clarity and completeness requirements
3. **Practical Examples**: Include working examples and real scenarios
4. **Progressive Learning**: Structure content from basic to advanced

**Onboarding Focus Areas** (adapt based on project needs):

- Welcome and project introduction
- Team structure, roles, and communication channels
- Essential accounts and access requirements
- Development environment setup (quick start)
- Key concepts and terminology
- First day/week/month tasks and goals
- Resources and where to get help
- Team culture and working practices
- Common workflows and processes
- Troubleshooting common issues

## Existing Documentation Discovery

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2: Existing Documentation Discovery for complete guidance.

**Quick Onboarding Documentation Search**:

!`echo "## Searching for existing onboarding documentation"; find . -type f \( -name "*onboard*.md" -o -name "*getting-started*.md" -o -name "*quickstart*.md" -o -name "*welcome*.md" \) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" ! -path "*/build/*" ! -path "*/dist/*" 2>/dev/null | sort`

**Common locations:**

- `./docs/onboarding.md` or `./ONBOARDING.md`
- `./docs/getting-started.md` or `./GETTING_STARTED.md`
- `./docs/quickstart.md`
- README.md may contain onboarding sections

## Output Requirements

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 3: Output Requirements for detailed guidelines.

**Default output location** (if no existing docs found): `./docs/onboarding.md`

Create documentation that enables new team members to feel welcomed, set up quickly, understand team structure, complete first tasks, and contribute confidently. Include proper markdown formatting with clear section headers, practical examples, checklists, and links to other documentation.
