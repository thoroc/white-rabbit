---
description: Generate quick project documentation (lightweight, general agent)
agent: general
type: command
category: Development
tags:
  - command
  - document
  - generate
  - quick
version: 1.0.0
last_updated: 2025-11-19
---

# Project Documentation Generation (Quick)

Create quick, lightweight project documentation using the general agent. This command is ideal for rapid documentation
generation without the overhead of specialized agents.
/se/
**Use this command when:**

- You need quick documentation turnaround
- Single document generation (typically README.md)
- Lightweight analysis is sufficient
- You don't need comprehensive multi-document suites

**For comprehensive documentation suites, use `/documentalist` instead.**

You are tasked with creating documentation for this codebase. Analyze the project structure, understand its purpose, and
generate appropriate documentation.

## Project Context

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` for detailed guidance on:

- Section 1: Project Analysis Approach
- Section 5: Knowledge Base Resources
- Section 7: Common Shell Commands Reference

### Quick Project Analysis

Run specific analysis commands from `.opencode/task/project-context.md`:

- Project Type Classification
- Technology Stack Summary
- Package Managers and Build Tools
- Testing Framework Detection

## Documentation Checklists

**COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 4: Checklist Integration for comprehensive checklist guidance.

**Available Checklists** (load only as needed):

- Development: `.opencode/checklist/development-documentation.md` (181 requirements)
- API: `.opencode/checklist/api-documentation.md` (150 requirements)
- Architecture: `.opencode/checklist/architecture-documentation.md` (161 requirements)
- Deployment: `.opencode/checklist/deployment-documentation.md` (183 requirements)

## Documentation Requirements

$ARGUMENTS

## Instructions

1. **Project Overview**: Analyze the codebase to understand:
   - Project purpose and main functionality
   - Technology stack and dependencies
   - Architecture and design patterns used
   - Key components and their relationships

2. **Discover Existing Documentation**: **CRITICAL** - Before creating ANY new documentation:

   **COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2: Existing Documentation Discovery for complete guidance.

   **Quick Discovery** - Run comprehensive discovery from `.opencode/task/documentation-discovery.md`:

   !`echo "=== Documentation Discovery ==="; find . -name "README*" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/vendor/*" 2>/dev/null | head -10; find . -type d -name "docs" ! -path "*/node_modules/*" 2>/dev/null | head -5`

   **After discovery:**
   - Review ALL discovered documentation files
   - Read existing files before creating new ones
   - NEVER create duplicates - update existing docs instead

3. **Analyze Discovered Documentation**:

   **COMMON SECTIONS**: See `.opencode/template/doc-command-common-sections-tmpl.yaml` → Section 2 for complete analysis checklist.

   **Key steps:**
   - Identify organization pattern (monorepo, centralized, root, mixed)
   - Note naming conventions and locations
   - Determine update vs create strategy

4. **Generate or Update Documentation**: **CRITICAL** - Based on discovered documentation, take appropriate action:

   **Standard Documentation Structure**: See `.opencode/template/standard-doc-structure.md` for complete structure.

   ### ⚠️ CRITICAL PRIORITY RULES ⚠️

   **RULE #1**: ALWAYS UPDATE existing documentation instead of creating duplicates **RULE #2**: NEVER create new
   documentation without running discovery first **RULE #3**: If documentation exists ANYWHERE in the project tree,
   update it in place **RULE #4**: Respect the existing location - don't move docs unless explicitly requested **RULE
   #5**: If creating new docs, match the existing organizational pattern

   ### Documentation Types to Consider

   Use the discovery results to locate existing documentation for these types:
   - **README.md**: Usually in project root, but may exist in subdirectories for monorepos
   - **API Documentation**: May be at `./docs/api.md`, `./API.md`, `./api/README.md`, `./packages/*/docs/api.md`
   - **Architecture Documentation**: May be at `./docs/architecture.md`, `./ARCHITECTURE.md`, `./docs/design.md`,
     `./.github/architecture.md`
   - **Development Documentation**: May be at `./docs/development.md`, `./CONTRIBUTING.md`, `./docs/dev-guide.md`
   - **Deployment Documentation**: May be at `./docs/deployment.md`, `./DEPLOYMENT.md`, `./ops/deployment.md`,
     `./deploy/README.md`
   - **Testing Documentation**: May be at `./docs/testing.md`, `./TEST.md`, `./tests/README.md`
   - **Security Documentation**: May be at `./docs/security.md`, `./SECURITY.md`, `./.github/SECURITY.md`

   ### When Existing Documentation IS Found (UPDATE MODE)

   **YOU MUST:**
   1. **READ the existing file FIRST** using the Read tool to understand:
      - Current structure and sections
      - Level of detail and target audience
      - Writing style and tone
      - Code examples and formatting conventions
      - Cross-references to other documentation
      - **The EXACT file path** - you will update this file at this location
   2. **UPDATE in place** - modify the existing file at its **EXACT current location** (don't move it)
   3. **Preserve valuable content** - don't delete working examples or important details
   4. **Enhance gaps** - add missing sections, update outdated information
   5. **Maintain consistency** - follow existing naming, location, and format conventions
   6. **Respect documentation hierarchy** - if there's an index/table of contents, update it
   7. **Verify completeness** - ensure the updated doc covers all necessary topics

   **Example**: If discovery finds `./services/api/docs/architecture.md`, you MUST:
   - Read `./services/api/docs/architecture.md`
   - Update `./services/api/docs/architecture.md` (not create `./docs/architecture.md`)

   ### When NO Existing Documentation is Found (CREATE MODE)

   **ONLY create new documentation if:**
   - ✅ You have run the comprehensive discovery command
   - ✅ You have verified no existing docs cover this topic AT ANY DEPTH
   - ✅ The discovery summary confirms the topic is truly missing
   - ✅ You have checked all subdirectories (not just root and ./docs/)

   **Creation Guidelines:**
   1. **Check for documentation directory patterns** from discovery results:
      - If `./docs/` exists → use it
      - If `./documentation/` exists → use it
      - If subdirectory pattern exists (e.g., `./packages/*/docs/`) → follow that pattern
      - If neither exists → create `./docs/` (GitHub/GitLab standard)
   2. **Follow naming conventions** observed in existing documentation:
      - Use lowercase filenames with `.md` extension (e.g., `api.md`, `architecture.md`)
      - Exception: `README.md` and `CONTRIBUTING.md` are typically uppercase (by convention)
      - Match the case pattern used by existing documentation
   3. **Place documentation logically**:
      - `README.md` → project root (always)
      - All other documentation → `./docs/` directory (or existing doc directory)
      - Exception: `CONTRIBUTING.md` often in root alongside README.md
      - For monorepos: place docs near the code they document (e.g., `./packages/foo/docs/`)
   4. **Create index/navigation** if creating multiple new docs:
      - Add table of contents to README.md linking to detailed docs
      - Consider creating `./docs/README.md` or `./docs/index.md` as a documentation hub
      - Update any existing documentation index files

5. **Code Analysis**: Include:
   - Main entry points and key modules
   - Configuration options
   - Environment variables and setup requirements
   - Testing approach and coverage

6. **Best Practices**: Ensure documentation follows:
   - Clear, concise writing
   - Proper markdown formatting
   - Code examples where helpful
   - Table of contents for longer documents
   - Links between related sections

7. **Diagram Requirements**: When including diagrams in documentation:
   - **MUST** use Mermaid syntax for all diagrams (see `.opencode/knowledge-base/mermaid-diagrams.md` for examples)
   - Use proper Mermaid code blocks: ```mermaid
   - Include appropriate diagram types: flowcharts, sequence diagrams, architecture diagrams
   - Ensure diagrams are properly formatted and render correctly

Focus on creating documentation that would help both new developers joining the project and users who want to understand
how to use it effectively.

If no specific documentation type is requested via arguments, create a comprehensive README.md that covers all essential
aspects of the project.
