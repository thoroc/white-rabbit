---
title: Knowledge Base Discovery and Documentation Validation
description: Systematic checklist for discovering, documenting, and validating OpenCode knowledge bases
type: checklist
category: documentation
version: 1.0.0
tags:
  - knowledge-base
  - discovery
  - validation
  - documentation
reference: ../knowledge-base/knowledge-base-system-architecture.md
applies_to:
  - knowledge-base-documentation
  - kb-discovery
  - command-development
last_updated: 2025-11-19
---

# Knowledge Base Discovery and Documentation Validation

Comprehensive checklist for systematically discovering, documenting, and validating OpenCode knowledge bases. Use this checklist when creating KB listings, documenting KBs, or building commands/agents that work with knowledge bases.

## Purpose

This checklist ensures:

- Complete KB discovery from all locations
- Accurate metadata and content extraction
- Proper categorization and organization
- Consistent formatting
- Comprehensive documentation

## 📋 1. Knowledge Base Discovery

### Global Knowledge Base Discovery

- [ ] **List all global KBs**: Run `ls -1 ~/.config/opencode/knowledge-base/*.md 2>/dev/null`
- [ ] **Extract KB names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order KBs for consistent presentation
- [ ] **Count global KBs**: Track number of global KBs found
- [ ] **Handle empty case**: Gracefully handle no global KBs scenario

### Project Knowledge Base Discovery

- [ ] **List all project KBs**: Run `ls -1 .opencode/knowledge-base/*.md 2>/dev/null`
- [ ] **Extract KB names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order KBs for consistent presentation
- [ ] **Count project KBs**: Track number of project KBs found
- [ ] **Handle empty case**: Display appropriate message if no project KBs found
- [ ] **Identify overrides**: Note which project KBs override global KBs

### Knowledge Base File Validation

- [ ] **Verify file accessibility**: Confirm each KB file can be read
- [ ] **Check file size**: Note if KB files unusually large (>800 lines)
- [ ] **Validate markdown format**: Ensure `.md` extension and valid markdown
- [ ] **Check for frontmatter**: Verify YAML frontmatter present

## 📖 2. Metadata Extraction

### Frontmatter Reading

- [ ] **Parse YAML frontmatter**: Extract frontmatter from each KB file
- [ ] **Extract title field**: Read `title` from frontmatter
- [ ] **Extract description field**: Read `description` from frontmatter
- [ ] **Extract type field**: Verify `type: knowledge-base` present
- [ ] **Extract category field**: Read `category` from frontmatter
- [ ] **Extract version field**: Read `version` from frontmatter
- [ ] **Extract difficulty field**: Read `difficulty` if present
- [ ] **Extract tags field**: Read `tags` array if present
- [ ] **Extract related_resources field**: Read related resources if present

### Fallback Content Extraction

- [ ] **Extract H1 heading**: If no frontmatter title, use first H1
- [ ] **Extract first paragraph**: If no frontmatter description, use first paragraph
- [ ] **Identify key sections**: Note main section headings

### Metadata Validation

- [ ] **Verify required fields present**: Ensure title, description, type exist
- [ ] **Validate title format**: Check title is descriptive (≤80 chars)
- [ ] **Validate description format**: Check description is concise (≤150 chars)
- [ ] **Validate type value**: Ensure type is "knowledge-base"
- [ ] **Validate category values**: Confirm category is one of: documentation, cicd, development, patterns, domain, meta
- [ ] **Validate version format**: Check semantic versioning (X.Y.Z format)
- [ ] **Check for missing metadata**: Flag KBs with incomplete frontmatter

### Content Analysis

- [ ] **Identify KB purpose**: Extract or infer KB purpose from overview
- [ ] **Determine when to use**: Identify appropriate use cases
- [ ] **Note KB type**: Classify as reference, guide, or concept KB
- [ ] **Extract key topics**: Identify main concepts covered
- [ ] **Check for examples**: Verify KB includes working examples
- [ ] **Identify special characteristics**: Flag meta KBs or domain-specific KBs

## 🗂️ 3. Knowledge Base Categorization

### Category Assignment

- [ ] **Documentation category**: Identify documentation-related KBs
  - [ ] mermaid-diagrams
  - [ ] acceptance-criteria
  - [ ] template-standard

- [ ] **CI/CD category**: Identify CI/CD and pipeline KBs
  - [ ] pipeline-best-practices
  - [ ] jenkins-patterns
  - [ ] gitlab-ci-examples
  - [ ] github-actions-templates

- [ ] **Development category**: Identify development practice KBs
  - [ ] loading-strategy
  - [ ] plugin-architecture
  - [ ] plugin-migration

- [ ] **Patterns category**: Identify framework and methodology KBs
  - [ ] moscow-prioritization
  - [ ] acceptance-criteria

- [ ] **Domain-Specific category**: Identify specialized domain KBs
  - [ ] ai-tool-approval-patterns

- [ ] **Meta category**: Identify system architecture KBs
  - [ ] task-system-architecture
  - [ ] template-system-architecture
  - [ ] knowledge-base-system-architecture

### Category Organization

- [ ] **Group by category**: Organize KBs into category groups
- [ ] **Order categories logically**: Standard order: Documentation, CI/CD, Development, Patterns, Domain-Specific, Meta
- [ ] **Sort within categories**: Alphabetize KBs within each category
- [ ] **Note uncategorized KBs**: Flag KBs without valid category
- [ ] **Handle multiple categories**: Note when KB fits multiple categories

## 📝 4. Documentation Formatting

### Knowledge Base Entry Formatting

- [ ] **Use bold for KB names**: Format as `**knowledge-base-name**`
- [ ] **Include title line**: Format as `- Title: [text]`
- [ ] **Include description line**: Format as `- Description: [text]`
- [ ] **Include key topics line**: Format as `- Key Topics: [topics]`
- [ ] **Include category line (optional)**: Format as `- Category: [category]`
- [ ] **Use consistent indentation**: 2-space indent for metadata lines
- [ ] **Add blank line between KBs**: Separate KB entries for readability

### Section Formatting

- [ ] **Use H3 for category headers**: Format as `### [Category] Knowledge Bases`
- [ ] **Add category description**: Brief explanation of category purpose
- [ ] **Add "when to use" guidance**: Explain appropriate use cases
- [ ] **Use consistent spacing**: Blank line before/after sections
- [ ] **Add horizontal rules**: Use `---` to separate major sections

### Code Examples

- [ ] **Format shell commands**: Use triple backticks with `bash` language
- [ ] **Format output examples**: Use triple backticks with `markdown` or no language
- [ ] **Include comments in code**: Explain what commands do
- [ ] **Show expected output**: Include sample output where helpful

## 🎯 5. Category Guidance

### Category Descriptions

- [ ] **Documentation**: "Guides for creating documentation, diagrams, and content"
- [ ] **CI/CD**: "Pipeline patterns, platform-specific guides, deployment strategies"
- [ ] **Development**: "Coding practices, architecture patterns, development workflows"
- [ ] **Patterns**: "Methodologies, prioritization, requirement management"
- [ ] **Domain-Specific**: "Specialized topics and technologies"
- [ ] **Meta**: "System architecture and meta-knowledge about OpenCode"

### When to Use Guidance

- [ ] **Documentation**: "Creating or improving documentation"
- [ ] **CI/CD**: "Setting up or optimizing CI/CD pipelines"
- [ ] **Development**: "Building features, refactoring, improving code quality"
- [ ] **Patterns**: "Planning, requirement analysis, decision-making"
- [ ] **Domain-Specific**: "Working with specific technologies or domains"
- [ ] **Meta**: "Understanding OpenCode systems and resource types"

### Special Notes

- [ ] **Flag meta KBs**: Note Meta category KBs are self-referential
- [ ] **Indicate project overrides**: Show when project KB overrides global
- [ ] **Highlight commonly used**: Note most frequently referenced KBs
- [ ] **Show KB relationships**: Indicate when KBs reference other KBs
- [ ] **Note KB types**: Indicate if reference, guide, or concept KB

## 📊 6. Summary Statistics

### Count Aggregation

- [ ] **Count total KBs**: Sum global + project KBs
- [ ] **Count global KBs**: Total from global directory
- [ ] **Count project KBs**: Total from project directory
- [ ] **Count by category**: KBs per category
- [ ] **Calculate override count**: Number of project KBs overriding global

### Summary Formatting

- [ ] **Total count format**: `**Found N knowledge bases total: N global, N project**`
- [ ] **Category breakdown**: Optional detailed breakdown by category
- [ ] **Position at end**: Place summary after all KB listings
- [ ] **Use consistent formatting**: Bold for numbers, clear labels

## 🔧 7. Usage Information

### Knowledge Base System Overview

- [ ] **Explain what KBs are**: Reference documentation for patterns and practices
- [ ] **Describe usage patterns**: Reference lookup, learning, validation, decision support
- [ ] **Note KB structure**: Markdown with standard sections
- [ ] **Reference architecture doc**: Link to knowledge-base-system-architecture

### Knowledge Base Locations

- [ ] **Document global location**: `~/.config/opencode/knowledge-base/`
- [ ] **Document project location**: `.opencode/knowledge-base/`
- [ ] **Explain override behavior**: Project KBs override global with same name
- [ ] **Provide discovery commands**: Shell commands to list KBs

### Integration Information

- [ ] **Agents use KBs**: Explain agent → KB relationship
- [ ] **Commands use KBs**: Explain command → KB relationship
- [ ] **Tasks use KBs**: Explain task → KB relationship
- [ ] **Checklists use KBs**: Explain checklist → KB relationship
- [ ] **Reference format template**: Link to knowledge-base-listing-format template

## ✅ 8. Quality Standards

### Completeness

- [ ] **All KBs discovered**: No KBs missed from either location
- [ ] **All metadata extracted**: Required fields present for all KBs
- [ ] **All categories covered**: Each category represented
- [ ] **All guidance included**: Category descriptions and usage guidance present
- [ ] **Summary accurate**: Counts match actual KB numbers

### Accuracy

- [ ] **Metadata correct**: Frontmatter values accurately extracted
- [ ] **Categories valid**: All categories from standard list
- [ ] **Versions valid**: Semantic versioning format
- [ ] **Titles accurate**: Match frontmatter or H1 exactly
- [ ] **Descriptions accurate**: Match frontmatter exactly
- [ ] **Key topics appropriate**: Topics reflect actual KB content

### Formatting Consistency

- [ ] **Consistent KB entry format**: All KBs follow same structure
- [ ] **Consistent heading levels**: H1, H2, H3 used appropriately
- [ ] **Consistent spacing**: Blank lines used uniformly
- [ ] **Consistent emphasis**: Bold used for KB names only
- [ ] **Consistent indentation**: 2-space indent throughout

### Usability

- [ ] **Clear organization**: Logical category grouping
- [ ] **Readable format**: Not too dense or sparse
- [ ] **Helpful guidance**: Sufficient context for KB selection
- [ ] **Easy navigation**: Clear section headers
- [ ] **Complete information**: All relevant details included

## 🔍 9. Validation Checks

### Pre-Output Validation

- [ ] **Verify file reads successful**: All KB files successfully read
- [ ] **Verify frontmatter parsing**: YAML parsed without errors
- [ ] **Verify categorization complete**: All KBs assigned category
- [ ] **Verify counts accurate**: Manual count matches calculated count
- [ ] **Verify no duplicates**: No KB listed multiple times

### Post-Output Validation

- [ ] **Review for typos**: Check spelling and grammar
- [ ] **Verify formatting**: Markdown renders correctly
- [ ] **Test links**: Ensure any links functional
- [ ] **Check completeness**: All discovered KBs present in output
- [ ] **Validate consistency**: Format consistent throughout

### Edge Case Handling

- [ ] **No KBs found**: Appropriate message displayed
- [ ] **Missing frontmatter**: Fallback to H1 and first paragraph
- [ ] **Invalid category**: Default or error handling
- [ ] **Malformed markdown**: Graceful error handling
- [ ] **File read errors**: Clear error messages

## 📚 10. Additional Documentation

### Related Resources

- [ ] **Link to KB system architecture**: Reference knowledge base
- [ ] **Link to KB template**: Reference opencode-knowledge-base-tmpl.yaml
- [ ] **Link to example KBs**: Point to representative examples
- [ ] **Link to commands using KBs**: Reference relevant commands

### Usage Examples

- [ ] **Show discovery commands**: Provide working shell commands
- [ ] **Show output format**: Include sample formatted output
- [ ] **Show integration examples**: Demonstrate command/agent/task usage
- [ ] **Show common patterns**: Typical KB selection scenarios

### Maintenance Notes

- [ ] **Review frequency**: Suggest when to re-run discovery
- [ ] **Update triggers**: List events requiring rediscovery
- [ ] **Version tracking**: Note how to handle version changes
- [ ] **Category changes**: Process for updating categories

---

## 🔍 Review Checklist

Before considering KB discovery and documentation complete:

### Discovery Complete

- [ ] All global KBs discovered and documented
- [ ] All project KBs discovered and documented
- [ ] Override relationships identified
- [ ] No KBs missed or duplicated

### Metadata Accurate

- [ ] All frontmatter extracted correctly
- [ ] All required fields present
- [ ] All values validated
- [ ] No parsing errors
- [ ] Fallback extraction used when needed

### Documentation Quality

- [ ] Consistent formatting throughout
- [ ] Clear categorization and organization
- [ ] Helpful guidance and context
- [ ] Accurate summary statistics
- [ ] Key topics identified for all KBs

### Usability Validated

- [ ] Easy to scan and find KBs
- [ ] Sufficient detail for KB selection
- [ ] Clear integration guidance
- [ ] Links to additional resources

---

## References

- [Knowledge Base System Architecture](../knowledge-base/knowledge-base-system-architecture.md)
- [Knowledge Base Listing Format Template](../template/knowledge-base-listing-format-tmpl.yaml)
- [OpenCode Knowledge Base Template](../template/opencode-knowledge-base-tmpl.yaml)
- [List Knowledge Bases Command](../command/list-knowledge-bases.md)
