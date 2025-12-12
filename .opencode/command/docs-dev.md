---
description: Generate development documentation for the project
agent: general
subtask: true
type: command
category: Development
tags:
  - command
  - docs
  - generate
  - development
version: 1.0.0
last_updated: 2025-11-19
---

# Development Documentation Generation

Create comprehensive development documentation by analyzing the codebase setup, build tools, testing frameworks, and development workflows.

## Development Analysis

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` for detailed guidance on:

- Section 1: Project Analysis Approach
- Section 4: Checklist Integration
- Section 5: Knowledge Base Resources

### Development-Specific Analysis Focus

Run these specific analysis commands from `.opencode/task/project-context.md`:

- Package Managers and Build Tools Detection
- Testing Framework Detection
- Development Configuration Check

For comprehensive development environment analysis, load `.opencode/task/dev/technology-detection.md`.

## Development Documentation Requirements

**CHECKLIST REFERENCE**: `.opencode/checklist/development-documentation.md` (181+ requirements)

**See**: `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 4: Checklist Integration for usage guidance.

## Development Focus

$ARGUMENTS

## Instructions

**Load and use the checklist reference above as your primary guide**. Work through each section systematically to ensure complete coverage:

1. **Follow the Checklist**: Address every ✅ item in the development documentation checklist
2. **Quality Standards**: Meet all clarity and completeness requirements
3. **Practical Examples**: Include working code examples and commands
4. **Troubleshooting**: Document common issues and solutions

**Development Focus Areas** (adapt based on detected technologies):

- Local development environment setup and prerequisites
- Dependency installation and package management
- Build tools and compilation processes
- Testing frameworks and test execution
- Code quality tools (linting, formatting, static analysis)
- Debugging tools and techniques
- Git workflow and branching strategies
- IDE setup and recommended extensions
- Common development tasks and workflows
- Troubleshooting guides for setup issues

## Existing Documentation Discovery

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2: Existing Documentation Discovery for complete guidance.

**Quick Development Documentation Search**:

!`echo "## Searching for existing development documentation"; find . -type f \( -name "*dev*.md" -o -name "*development*.md" -o -name "*contributing*.md" -o -name "*CONTRIBUTING*.md" -o -name "*setup*.md" \) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" ! -path "*/build/*" ! -path "*/dist/*" 2>/dev/null | sort`

**Common locations:**

- `./CONTRIBUTING.md` (root level - GitHub/GitLab convention)
- `./docs/development.md`
- `./docs/setup.md`
- `./packages/*/docs/development.md` (monorepos)

**Note**: CONTRIBUTING.md is often in root by convention - don't move it unless explicitly requested.

## Output Requirements

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 3: Output Requirements for detailed guidelines.

**Default output location** (if no existing docs found): `./docs/development.md`

Create documentation that enables new developers to set up their environment quickly, understand workflows, run tests, and contribute confidently. Include proper markdown formatting with clear section headers, code examples, and troubleshooting guidance.
