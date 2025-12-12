---
description: Generate API documentation for the project
agent: general
subtask: true
type: command
category: Development
tags:
  - command
  - docs
  - generate
  - documentation
version: 1.0.0
last_updated: 2025-11-19
---

# API Documentation Generation

Generate comprehensive API documentation by analyzing the codebase and identifying all API endpoints, functions, and
interfaces.

## Project Analysis

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` for detailed guidance on:

- Section 1: Project Analysis Approach
- Section 4: Checklist Integration
- Section 5: Knowledge Base Resources

### API-Specific Analysis Focus

Run these specific analysis commands from `.opencode/task/project-context.md`:

- Technology Stack Summary
- API Framework Detection
- Project Configuration Files

For comprehensive API infrastructure analysis, load `.opencode/task/infrastructure-analysis.md`.

## Documentation Requirements

**CHECKLIST REFERENCE**: `.opencode/checklist/api-documentation.md` (150+ requirements)

**See**: `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 4: Checklist Integration for usage
guidance.

## Documentation Focus

$ARGUMENTS

## Instructions

**Load and use the checklist reference above as your comprehensive guide**. Ensure every section marked with ✅ is
addressed in your documentation. Pay special attention to:

1. **Follow the Checklist**: Work through each section systematically
2. **Quality Standards**: Meet all quality criteria outlined in the checklist
3. **Specialized Sections**: Include relevant specialized sections for this specific project
4. **Review Criteria**: Ensure the final documentation passes all review checks

**Project-Specific Focus Areas** (adapt based on detected technologies):

- REST API endpoints and HTTP methods
- Function/Lambda APIs and event structures
- Database operations and data models
- External service integrations and webhooks
- Error handling and monitoring integration
- Authentication, authorization, and security patterns
- Request/response schemas and validation
- Rate limiting and performance considerations

## Existing Documentation Discovery

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2: Existing Documentation
Discovery for complete guidance.

**Quick API Documentation Search**:

!`echo "## Searching for existing API documentation"; find . -type f \( -name "*api*.md" -o -name "*API*.md" -o -name "*endpoints*.md" -o -name "*reference*.md" -o -iname "openapi*.yml" -o -iname "swagger*.yml" \) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" ! -path "*/build/*" ! -path "*/dist/*" 2>/dev/null | sort`

**Common locations for API documentation:**

- `./docs/api.md` or `./docs/API.md`
- `./API.md` (root level)
- `./packages/*/docs/api.md` (monorepos)
- OpenAPI/Swagger specs

## Output Requirements

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 3: Output Requirements for
detailed guidelines.

**Default output location** (if no existing docs found): `./docs/api.md`

Generate clear, comprehensive API documentation that developers can use to integrate with the system effectively.
Include proper markdown formatting with clear section headers and navigation.
