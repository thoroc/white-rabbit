---
description: Generate comprehensive documentation with strict formatting standards
agent: documentalist
subtask: false
type: command
category: Development
tags:
    - command
    - generate
    - docs
    - comprehensive
    - documentation
version: 1.0.0
last_updated: 2025-11-19
---

# Strict Documentation Generation

Generate comprehensive documentation for this project following strict formatting guidelines and comprehensive coverage standards.

## Project Analysis

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` for detailed guidance on:

- Section 1: Project Analysis Approach
- Section 4: Checklist Integration
- Section 5: Knowledge Base Resources

Run specific analysis commands from `.opencode/task/project-context.md` as needed for initial project assessment.

## Documentation Requirements

**IMPORTANT**: This command generates a complete documentation suite following strict standards.

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 4: Checklist Integration for comprehensive checklist guidance.

**Available Checklists** (load as needed):

- API: `.opencode/checklist/api-documentation.md` (150+ requirements)
- Architecture: `.opencode/checklist/architecture-documentation.md` (161+ requirements)
- Deployment: `.opencode/checklist/deployment-documentation.md` (183+ requirements)
- Development: `.opencode/checklist/development-documentation.md` (181+ requirements)

## Strict Formatting Standards

### General Requirements

- **Output Directory:** All documents MUST be created in `docs/` directory at the root of the project
- **File Naming:** Use lowercase with hyphens (e.g., `architecture.md`, `development.md`, `api.md`, `onboarding.md`)
- **Date Format:** All dates MUST use ISO 8601 format (e.g., `2025-11-10T00:00:00Z`)
- **Version Format:** Use semantic versioning (e.g., `1.0.0`)
- **Mermaid Diagrams:** All diagrams MUST use Mermaid syntax in ```mermaid code blocks
- **Code Examples:** All code examples MUST include proper syntax highlighting with language identifiers
- **Tables:** Use consistent markdown table formatting with proper alignment
- **Headers:** Each document must start with appropriate metadata (Generated date, Version, Last Updated)

### Document Structure Standards

Each document type must follow the structure defined in its respective checklist:

1. **Architecture Document** (`docs/architecture.md`)
    - Follow `.opencode/checklist/architecture-documentation.md`
    - Must include: System overview, architecture diagrams, component descriptions, data flow, deployment architecture, technology stack
    - Minimum 3 Mermaid diagrams: system architecture, data flow, deployment

2. **Development Guide** (`docs/development.md`)
    - Follow `.opencode/checklist/development-documentation.md`
    - Must include: Prerequisites, setup instructions, build commands, testing guidelines, debugging tips
    - Include working code examples and commands

3. **API Documentation** (`docs/api.md`)
    - Follow `.opencode/checklist/api-documentation.md`
    - Must include: Base URL, authentication, endpoints with full specifications, error handling
    - Complete request/response examples for all endpoints

4. **Onboarding Document** (`docs/onboarding.md`)
    - Quick start guide (5-minute setup)
    - Project overview and key concepts
    - Common development tasks
    - Troubleshooting guide
    - Next steps checklist

## Documentation Focus

$ARGUMENTS

## Instructions

**You are the documentalist agent** - a specialist in creating comprehensive, professional documentation.

**Your Approach:**

1. **Discover Existing Documentation**: **CRITICAL FIRST STEP**

    **COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2: Existing Documentation Discovery for complete guidance.

    **Run Comprehensive Discovery** from `.opencode/task/documentation-discovery.md`:

    !`echo "## Discovering existing documentation (All Depths)"; find . -type d \( -name "docs" -o -name "documentation" \) ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | sort; find . -type f -name "*.md" \( -iname "*readme*" -o -iname "*doc*" -o -path "*/docs/*" \) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" 2>/dev/null | head -20`
    - READ each existing documentation file to understand structure
    - Identify document types at any depth
    - Note locations, naming, and organizational patterns

2. **Load Checklists**: Load the comprehensive checklists for each document type you're creating or updating
3. **Analyze Project**: Use tasks to understand the technology stack and architecture
4. **Generate or Update Documents**:
    - **If documentation exists**: UPDATE it in its current location, preserving valuable content
    - **If documentation doesn't exist**: CREATE new document following checklist requirements exactly
5. **Quality Assurance**: Verify each document meets all checklist criteria before completion
6. **Consistency Check**: Ensure terminology and style are consistent across all documents

**Document Generation Order:**

1. Start with Architecture documentation (provides context for others)
2. Then Development documentation (setup and workflows)
3. Then API documentation (if applicable)
4. Finally Onboarding documentation (synthesizes the others)

**Quality Standards:**

- **Completeness**: Every section in the checklists must be addressed
- **Accuracy**: All commands, paths, and examples must be verified
- **Clarity**: Use clear, concise language appropriate for the audience
- **Visual**: Include appropriate Mermaid diagrams for all architecture documentation
- **Practical**: Provide working examples and troubleshooting guidance
- **Professional**: Maintain consistent formatting and terminology

## Output Requirements

**Standard Documentation Structure**: See `.opencode/template/standard-doc-structure.md` for complete structure.

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 3: Output Requirements for detailed guidelines.

**Key Points**:

- Always discover existing documentation FIRST - Never create duplicates
- UPDATE existing documentation in place instead of creating new files
- If no docs found: Create `./docs/` directory and generate files there
- Do NOT modify README.md unless explicitly requested
- Ensure all Mermaid diagrams render correctly
- Include table of contents in longer documents

## Validation Checklist

**IMPORTANT**: Use the comprehensive strict documentation validation checklist for complete quality assurance.

**VALIDATION CHECKLIST REFERENCE**: `.opencode/checklist/strict-documentation-validation.md`

- Load this checklist to validate all generated documentation
- Meta-checklist that ensures all primary checklists were followed
- Validates strict formatting standards across all documents
- Includes pre-release review criteria and quality gates
- Load during final validation phase before completion

### Quick Validation Summary

Before completing, verify the following key items (full checklist in referenced file):

- [ ] **Discovery Performed**: Comprehensive discovery was run at all depths
- [ ] **Existing Docs Updated**: Existing documentation updated (not duplicated)
- [ ] **All Primary Checklists Followed**: Each document type validated against its primary checklist
- [ ] **Strict Formatting Applied**: ISO dates, semantic versions, kebab-case filenames
- [ ] **Diagrams Rendering**: All Mermaid diagrams render correctly
- [ ] **No Placeholders**: No TODO, TBD, or placeholder text
- [ ] **All Links Working**: Internal and external links verified
- [ ] **Commands Tested**: All commands and examples tested
- [ ] **Consistent Terminology**: No contradictions between documents
- [ ] **Quality Gates Passed**: 95%+ completion rate on validation checklist

## Success Criteria

Documentation is complete when:

1. Existing documentation has been discovered and reviewed
2. All four document types are generated or updated appropriately
3. Existing documentation is updated (not duplicated) when found
4. All checklist items are addressed
5. All validation checks pass
6. Documents are consistent and cross-referenced
7. All examples and commands are verified working
8. Mermaid diagrams render correctly
9. Valuable existing content has been preserved
10. Documentation is ready for immediate use by developers
