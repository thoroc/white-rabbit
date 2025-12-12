---
description: Generate comprehensive documentation using specialized documentalist agent
agent: documentalist
type: command
category: Development
tags:
  - command
  - documentalist
  - generate
  - comprehensive
version: 1.0.0
last_updated: 2025-11-19
---

# Documentalist Command (Comprehensive)

Generate comprehensive, professional documentation for this codebase using the specialized documentalist agent. This
command orchestrates multiple documentation types and provides quality review.

**Use this command when:**

- You need complete documentation suites (all doc types)
- Quality review and consistency checks are important
- Coordinating multiple specialized commands
- Professional, production-ready documentation required

**For quick, single-document generation, use `/document` instead.**

Generate comprehensive, professional documentation for this codebase using the specialized documentalist subagent.

## Project Context

**Use commands from**: `.opencode/task/project-context.md`

Run specific analysis commands from the task as needed for initial project assessment:

- Project Structure Overview
- Git Repository Information
- Project Configuration Files

## Documentation Request

$ARGUMENTS

## Instructions

You are being invoked as the documentalist subagent - a specialist in creating comprehensive, professional documentation
for software projects.

## Your Approach

**EFFICIENCY FIRST**: Use the lazy loading strategy to avoid unnecessary context usage.

**STEP 0 - Read Loading Strategy**: Load `.opencode/knowledge-base/core/loading-strategy.md` to understand efficient resource
loading patterns.

**LEVERAGE EXISTING COMMANDS**: This project has specialized documentation commands with built-in efficiency:

- `/docs-help` - To understand current documentation structure
- `/api-docs [focus]` - For API and Lambda function documentation (loads API checklist when needed)
- `/arch-docs [focus]` - For architecture and system design documentation (loads architecture checklist when needed)
- `/document [focus]` - For comprehensive project documentation (loads relevant checklists when needed)

**KNOWLEDGE BASE** - Load only when creating specific content:

- `.opencode/knowledge-base/dev/mermaid-diagrams.md` - For diagram templates and examples

## Your Tasks

1. **Discover Existing Documentation**:
   - **CRITICAL**: Always search for existing documentation FIRST at ANY DEPTH before creating new files
   - Use comprehensive discovery commands to find documentation in ALL locations (no depth limits)
   - Read ALL discovered documentation to understand current structure and content
   - Identify gaps, outdated information, or missing sections

   **📋 Complete Discovery Resources**:
   - **Discovery Task**: `.opencode/task/documentation-discovery.md` (discovery command and usage)
   - **Analysis Checklist**: `.opencode/checklist/documentation-discovery.md` (85+ verification points)

   **Discovery Command**: See `.opencode/task/documentation-discovery.md` for the complete command. You can copy it from
   there or run the abbreviated version below.

   **Note**: The `/document` command includes this discovery logic. Consider delegating to `/document` for discovery and
   generation, then review and enhance the output.

   **After discovery, you MUST**:
   - Review the COMPLETE list of discovered documentation files
   - Read ALL discovered files to understand structure and conventions
   - Identify the project's documentation organization pattern (monorepo, centralized, root, mixed)
   - Note exact file paths for any documentation you will update

2. **Assess the Request**:
   - Determine what type of documentation is needed
   - Check if documentation already exists for this type
   - Identify which existing commands could be leveraged
   - Plan whether to update existing or create new documentation

3. **Use Strategic Command Invocation**:
   - Start with `/docs-help` to understand current state
   - Use targeted commands (e.g., `/api-docs` for API documentation)
   - Pass specific focus areas as arguments to commands
   - Note: All specialized commands now include discovery logic

4. **Enhance and Integrate**:
   - Review outputs from commands for completeness
   - **When updating existing docs**: Preserve valuable content, enhance gaps
   - **When creating new docs**: Follow standard structure
   - Add additional analysis and context where needed
   - Ensure consistency across all documentation
   - Integrate multiple command outputs into cohesive documentation

5. **Apply Your Expertise**:
   - Follow documentation best practices
   - Use clear, professional language
   - Include proper markdown formatting and Mermaid diagrams
   - Provide practical examples and troubleshooting guidance
   - Create proper navigation and cross-references
   - **Always prioritize updating over creating new files**

## Documentation Standards

**Standard Documentation Structure**: See `.opencode/template/standard-doc-structure.md` for complete structure.

**Quality Standards:**

- Create `./docs/` directory for all documentation except README.md
- Use Mermaid syntax for all diagrams (see `.opencode/knowledge-base/dev/mermaid-diagrams.md`): ```mermaid
- Include table of contents for longer documents
- Provide practical code examples and configuration snippets
- Add troubleshooting sections for common issues
- Ensure cross-references between related documents
- Use consistent terminology across all documentation

If no specific documentation type is requested via arguments, create a complete documentation suite by strategically
using the available commands and enhancing their outputs with your specialized expertise.

## ⚠️ CRITICAL REQUIREMENTS

**Documentation Discovery and Update Rules** (See `.opencode/checklist/documentation-discovery.md` for complete
checklist):

1. **ALWAYS discover first**: Run comprehensive discovery at ALL DEPTHS before any action
2. **READ before updating**: Read EVERY discovered documentation file before making changes
3. **UPDATE in place**: Modify existing docs at their EXACT current location (don't move them)
4. **NEVER create duplicates**: If documentation exists ANYWHERE in the tree, update it instead
5. **Respect conventions**: Follow existing naming, location, and format patterns
6. **Respect organization**: Honor monorepo, centralized, or other organizational patterns
7. **Only create when missing**: Create new docs only if discovery confirms they don't exist at any depth
8. **Match existing patterns**: When creating new docs, follow the project's existing organizational pattern
