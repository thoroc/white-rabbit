---
description: Generate pipeline and CI/CD documentation
agent: pipeline-architect
subtask: true
type: command
category: Development
tags:
    - command
    - pipeline
    - docs
    - generate
    - ci/cd
version: 1.0.0
last_updated: 2025-11-19
---

# Pipeline Documentation Generation

Generate comprehensive CI/CD pipeline documentation by analyzing pipeline configurations, build processes, deployment workflows, and automation scripts.

## Pipeline Analysis

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` for detailed guidance on:

- Section 1: Project Analysis Approach
- Section 4: Checklist Integration
- Section 5: Knowledge Base Resources (including platform-specific guides)

### Pipeline-Specific Analysis Focus

Run these specific analysis commands from `.opencode/task/project-context.md`:

- CI/CD Platform Detection
- Container and Orchestration Detection
- Infrastructure as Code Detection

For comprehensive pipeline analysis, load `.opencode/task/dev/deployment-strategy.md`.

**Platform-Specific Knowledge Bases** (load when documenting specific platforms):

- Jenkins: `.opencode/knowledge-base/jenkins-patterns.md`
- GitLab CI: `.opencode/knowledge-base/gitlab-ci-examples.md`
- GitHub Actions: `.opencode/knowledge-base/github-actions-templates.md`
- Cross-platform: `.opencode/knowledge-base/pipeline-best-practices.md`

## Pipeline Documentation Requirements

**CHECKLIST REFERENCE**: `.opencode/checklist/pipeline-documentation.md` (190+ requirements)

**See**: `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 4: Checklist Integration for usage guidance.

## Pipeline Focus

$ARGUMENTS

## Instructions

**Load and use the checklist reference above as your primary guide**. Work through each section systematically to ensure complete coverage:

1. **Follow the Checklist**: Address every ✅ item in the pipeline documentation checklist
2. **Quality Standards**: Meet all diagram and technical accuracy requirements
3. **Platform-Specific Sections**: Include relevant specialized sections (Jenkins, GitLab CI, GitHub Actions)
4. **Multi-Document Structure**: Create both summary and detailed per-pipeline documents
5. **Review Criteria**: Ensure final documentation passes all review checks

**Leverage your specialized pipeline-architect expertise**. You have deep knowledge of:

- Jenkins (scripted and declarative pipelines)
- GitLab CI/CD (stages, jobs, runners)
- GitHub Actions (workflows, actions, runners)
- CI/CD best practices and patterns

**Analysis Approach:**

1. **Identify Platform(s)**: Determine which CI/CD platform(s) are in use
2. **Load Relevant Knowledge**: Load the appropriate knowledge base for the platform
3. **Load Checklist**: Load `.opencode/checklist/pipeline-documentation.md` for comprehensive requirements
4. **Analyze Configuration**: Review pipeline files for stages, jobs, and workflows
5. **Document Architecture**: Create clear diagrams showing pipeline flow
6. **Extract Patterns**: Identify reusable patterns and best practices
7. **Document Dependencies**: Map external dependencies and integrations
8. **Troubleshooting Guide**: Document common issues and solutions

## Existing Documentation Discovery

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2: Existing Documentation Discovery for complete guidance.

**Quick Pipeline Documentation Search**:

!`echo "## Searching for existing pipeline documentation"; find . -type f \( -name "*pipeline*.md" -o -name "*cicd*.md" -o -name "*ci-cd*.md" \) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" ! -path "*/build/*" ! -path "*/dist/*" 2>/dev/null | sort; echo ""; echo "## Pipeline directories:"; find . -type d -name "pipelines" 2>/dev/null`

**Common locations:**

- `./docs/pipeline-summary.md` or `./docs/pipeline.md`
- `./docs/pipelines/` (individual pipeline docs)
- `./.github/docs/` or `./.gitlab/docs/`

**Special considerations:** If `./docs/pipelines/` directory exists, continue using it for detailed pipeline docs.

## Output Requirements

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 3: Output Requirements for detailed guidelines.

**CHECKLIST DEFINES COMPLETE STRUCTURE**: The checklist `.opencode/checklist/pipeline-documentation.md` defines multi-document structure with summary and per-pipeline details.

**Default output locations** (if no existing docs found):

- Summary: `./docs/pipeline-summary.md`
- Detailed per-pipeline files: `./docs/pipelines/<safe-pipeline-name>.md`

Create documentation that enables developers and operators to understand CI/CD workflows, configure pipelines safely, and troubleshoot failures effectively. Include proper Markdown formatting with clear headers, code blocks, diagrams, and troubleshooting guidance.
