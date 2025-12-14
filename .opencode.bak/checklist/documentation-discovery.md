---
title: Documentation Discovery and Analysis Checklist
description: Use this checklist to ensure comprehensive discovery of existing documentation before creating or updating
type: checklist
category: documentation
version: 1.0.0
tags:
    - checklist
    - documentation
    - discovery
last_updated: 2025-11-19
---

# Documentation Discovery and Analysis Checklist

Use this checklist to ensure comprehensive discovery of existing documentation before creating or updating
documentation. This prevents duplicate documentation and respects existing project conventions.

## 🔍 Discovery Phase

### ✅ 1. Run Comprehensive Documentation Discovery

**MANDATORY**: Run the comprehensive discovery command to find ALL documentation at ANY depth.

- [ ] **Execute discovery command**: Run the full documentation discovery shell command
- [ ] **Review complete results**: Examine ALL discovered files, not just the first few
- [ ] **Check summary count**: Note the total number of documentation files found
- [ ] **Verify depth coverage**: Ensure search covered entire project tree (no depth limits)
- [ ] **Check all categories**: Review results for all doc types (README, API, Architecture, etc.)

### ✅ 2. Document Inventory

Create a comprehensive inventory of discovered documentation:

- [ ] **README files**: List all README files found (root and subdirectories)
- [ ] **Documentation directories**: Identify all doc directories (./docs, ./documentation, ./doc, etc.)
- [ ] **API documentation**: Note locations of API docs (.md, .rst, OpenAPI/Swagger specs)
- [ ] **Architecture documentation**: Note architecture and design doc locations
- [ ] **Development documentation**: Note dev guides, contributing docs, setup guides
- [ ] **Deployment documentation**: Note deployment, operations, installation guides
- [ ] **Testing documentation**: Note testing guides and QA documentation
- [ ] **Security documentation**: Note security policies and guidelines
- [ ] **Other formats**: Note non-markdown docs (.rst, .adoc, .txt)

## 📖 Analysis Phase

### ✅ 3. Read and Analyze Existing Documentation

**CRITICAL**: Read EVERY discovered documentation file before making changes.

- [ ] **Read all discovered files**: Use Read tool to examine each file's content
- [ ] **Understand current structure**: Note how each doc is organized (sections, headings)
- [ ] **Assess completeness**: Identify what's covered and what's missing
- [ ] **Check cross-references**: Note links between documentation files
- [ ] **Review code examples**: Note style and format of existing examples
- [ ] **Identify target audience**: Determine level of detail and technical depth
- [ ] **Note writing style**: Observe tone, voice, and formatting conventions

### ✅ 4. Convention Analysis

Identify and document existing conventions:

- [ ] **File naming patterns**: Note case usage (README vs readme, UPPERCASE vs lowercase)
- [ ] **File extensions**: Note format preferences (.md, .rst, .adoc, .txt)
- [ ] **Location patterns**: Identify where different doc types are placed
- [ ] **Directory structure**: Note organization (flat, hierarchical, by topic)
- [ ] **Section structure**: Note common section headings and ordering
- [ ] **Formatting standards**: Note markdown conventions, code block styles, etc.

### ✅ 5. Organization Pattern Identification

Determine the project's documentation pattern:

- [ ] **Monorepo pattern**: Docs in subdirectories (e.g., `./packages/*/docs/`, `./services/*/docs/`)
- [ ] **Centralized pattern**: All docs in single directory (`./docs/`, `./documentation/`)
- [ ] **Root pattern**: Docs in project root (common for small projects)
- [ ] **Mixed pattern**: Some docs in root, detailed docs in subdirectories
- [ ] **Platform-specific**: GitHub (`./.github/`), GitLab (`./.gitlab/`), or CI/CD specific locations
- [ ] **Component-specific**: Docs colocated with code they document

### ✅ 6. Gap Analysis

Identify what documentation is missing or incomplete:

- [ ] **Missing doc types**: Note which standard documentation types don't exist
- [ ] **Incomplete coverage**: Identify docs that exist but are incomplete
- [ ] **Outdated information**: Note docs that need updates
- [ ] **Broken references**: Identify broken links or missing cross-references
- [ ] **Missing examples**: Note where code examples would be helpful
- [ ] **Unclear sections**: Identify confusing or ambiguous content

## 🎯 Decision Phase

### ✅ 7. Location Decision Rules

Apply these rules to determine where to place documentation:

- [ ] **Existing docs pattern**: If docs exist in `./docs/`, use that location
- [ ] **Alternative patterns**: If docs use `./documentation/`, respect that choice
- [ ] **Subdirectory patterns**: If monorepo uses `./packages/*/docs/`, follow that pattern
- [ ] **Root location**: If docs are in root for small project, keep them there
- [ ] **Scattered docs**: If docs are scattered, evaluate if consolidation adds value
- [ ] **Platform conventions**: Respect GitHub/GitLab specific conventions (`.github/`, `.gitlab/`)
- [ ] **Colocated docs**: For component-specific docs, place near the code

### ✅ 8. Update vs Create Decision

Determine whether to update existing docs or create new ones:

**UPDATE MODE** (when existing documentation found):

- [ ] **Exact file path noted**: Record the EXACT location of the file to update
- [ ] **Read before updating**: Read the file completely before making changes
- [ ] **Preserve valuable content**: Plan to keep working examples and important details
- [ ] **Identify gaps to fill**: Note what sections need enhancement
- [ ] **Maintain consistency**: Plan to match existing style and structure
- [ ] **Update cross-references**: Plan to update any affected documentation indices

**CREATE MODE** (only when NO existing documentation found):

- [ ] **Discovery verified**: Confirmed discovery command found no existing docs on this topic
- [ ] **All depths checked**: Verified no docs exist in subdirectories
- [ ] **Pattern identified**: Determined the appropriate location based on existing patterns
- [ ] **Naming decided**: Chosen filename that matches existing conventions
- [ ] **Format selected**: Selected format (.md, .rst, etc.) matching project preference
- [ ] **Index update planned**: Planned to update README or documentation index

## ✨ Quality Assurance

### ✅ 9. Pre-Action Verification

Before making any changes, verify:

- [ ] **Discovery completed**: Comprehensive discovery command was run
- [ ] **All files reviewed**: Every discovered file was read and analyzed
- [ ] **Conventions identified**: Project conventions are documented and understood
- [ ] **Pattern recognized**: Documentation organization pattern is clear
- [ ] **Decision made**: Clear decision on update vs create mode
- [ ] **Location determined**: Exact file path for update or creation is known
- [ ] **No duplicates**: Confirmed no duplicate documentation will be created

### ✅ 10. Post-Action Verification

After creating or updating documentation:

- [ ] **Content complete**: All planned sections are included
- [ ] **Conventions followed**: Matches existing naming, location, and format conventions
- [ ] **Cross-references updated**: Documentation index or TOC is updated if needed
- [ ] **Examples included**: Code examples are provided where appropriate
- [ ] **Links verified**: All internal links work correctly
- [ ] **Format validated**: Markdown/RST renders correctly
- [ ] **No duplicates created**: Verified no duplicate documentation was created

## 🚫 Critical Don'ts

### ✅ 11. Prohibited Actions

Ensure these mistakes are avoided:

- [ ] **Never assume no docs exist**: Always run discovery before claiming docs don't exist
- [ ] **Never skip reading**: Always read existing docs before updating them
- [ ] **Never create duplicates**: If docs exist anywhere in tree, update them instead
- [ ] **Never move docs**: Don't relocate existing docs without explicit request
- [ ] **Never ignore depth**: Don't limit search to shallow depths (root and ./docs only)
- [ ] **Never truncate results**: Don't limit discovery results with head/tail
- [ ] **Never discard conventions**: Don't impose new conventions over existing ones
- [ ] **Never ignore monorepo patterns**: Recognize and respect subdirectory documentation

## 📊 Checklist Summary

**Total Items**: 85+ verification points across 11 categories

**Usage**:

- Use this checklist when running `/document` or `/documentalist` commands
- Complete discovery phase BEFORE any analysis
- Complete analysis phase BEFORE any updates/creation
- Verify all quality checks AFTER making changes

**Success Criteria**:

- All discovery steps completed
- All discovered files read and analyzed
- Clear decision on update vs create mode
- No duplicate documentation created
- Existing conventions respected
- Documentation is complete and accurate
