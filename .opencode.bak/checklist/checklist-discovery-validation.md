---
title: Checklist Discovery and Documentation Validation
description: Systematic checklist for discovering, documenting, and validating OpenCode checklists
type: checklist
category: quality
version: 1.0.0
tags:
    - checklists
    - discovery
    - validation
    - documentation
reference: ../knowledge-base/checklist-system-architecture.md
applies_to:
    - checklist-documentation
    - checklist-discovery
    - command-development
last_updated: 2025-11-19
---

# Checklist Discovery and Documentation Validation

Comprehensive checklist for systematically discovering, documenting, and validating OpenCode checklists. Use this checklist when creating checklist listings, documenting checklists, or building commands/agents that work with checklists.

## Purpose

This checklist ensures:

- Complete checklist discovery from all locations
- Accurate metadata extraction
- Proper categorization and organization
- Consistent formatting
- Comprehensive documentation

## 📋 1. Checklist Discovery

### Global Checklist Discovery

- [ ] **List all global checklists**: Run `ls -1 ~/.config/opencode/checklist/*.md 2>/dev/null`
- [ ] **Extract checklist names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order checklists for consistent presentation
- [ ] **Count global checklists**: Track number of global checklists found
- [ ] **Handle empty case**: Gracefully handle no global checklists scenario

### Project Checklist Discovery

- [ ] **List all project checklists**: Run `ls -1 .opencode/checklist/*.md 2>/dev/null`
- [ ] **Extract checklist names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order checklists for consistent presentation
- [ ] **Count project checklists**: Track number of project checklists found
- [ ] **Handle empty case**: Display appropriate message if no project checklists found
- [ ] **Identify overrides**: Note which project checklists override global checklists

### Checklist File Validation

- [ ] **Verify file accessibility**: Confirm each checklist file can be read
- [ ] **Check file size**: Note if checklist files unusually large (>1000 lines)
- [ ] **Validate markdown format**: Ensure `.md` extension and valid markdown
- [ ] **Check for frontmatter**: Verify YAML frontmatter present

## 📖 2. Metadata Extraction

### Frontmatter Reading

- [ ] **Parse YAML frontmatter**: Extract frontmatter from each checklist file
- [ ] **Extract title field**: Read `title` from frontmatter
- [ ] **Extract description field**: Read `description` from frontmatter
- [ ] **Extract type field**: Verify `type: checklist` present
- [ ] **Extract category field**: Read `category` from frontmatter
- [ ] **Extract version field**: Read `version` from frontmatter
- [ ] **Extract tags field**: Read `tags` array if present
- [ ] **Extract reference field**: Read `reference` path if present
- [ ] **Extract applies_to field**: Read applicable project types if present

### Metadata Validation

- [ ] **Verify required fields present**: Ensure title, description, type, category, version exist
- [ ] **Validate title format**: Check title is descriptive (≤80 chars)
- [ ] **Validate description format**: Check description is concise (≤150 chars)
- [ ] **Validate type value**: Ensure type is "checklist"
- [ ] **Validate category values**: Confirm category is one of: documentation, quality, development, operations, process
- [ ] **Validate version format**: Check semantic versioning (X.Y.Z format)
- [ ] **Check for missing metadata**: Flag checklists with incomplete frontmatter

### Content Analysis

- [ ] **Identify checklist purpose**: Extract or infer checklist purpose
- [ ] **Determine when to use**: Identify appropriate use cases
- [ ] **Count sections**: Note number of major sections (typically 8-12)
- [ ] **Estimate size**: Count checkbox items (quick/standard/comprehensive/exhaustive)
- [ ] **Note special characteristics**: Flag meta checklists, discovery checklists
- [ ] **Check for quality standards section**: Verify quality criteria included
- [ ] **Check for review checklist**: Verify final validation section included

## 🗂️ 3. Checklist Categorization

### Category Assignment

- [ ] **Documentation category**: Identify documentation validation checklists
    - [ ] api-documentation
    - [ ] architecture-documentation
    - [ ] development-documentation
    - [ ] deployment-documentation
    - [ ] onboarding-documentation
    - [ ] pipeline-documentation

- [ ] **Quality category**: Identify quality and discovery checklists
    - [ ] documentation-discovery
    - [ ] strict-documentation-validation
    - [ ] task-discovery-validation
    - [ ] template-discovery-validation
    - [ ] knowledge-base-discovery-validation
    - [ ] command-discovery-validation

- [ ] **Development category**: Identify resource creation checklists
    - [ ] opencode-agent
    - [ ] opencode-command

- [ ] **Operations category**: Identify operational workflow checklists
    - [ ] github-workflow-safety

- [ ] **Process category**: Identify process and workflow checklists
    - [ ] ai-tool-approval
    - [ ] jira-ticket-creation

### Category Organization

- [ ] **Group by category**: Organize checklists into category groups
- [ ] **Order categories logically**: Standard order: Documentation, Quality, Development, Operations, Process
- [ ] **Sort within categories**: Alphabetize checklists within each category
- [ ] **Note uncategorized checklists**: Flag checklists without valid category
- [ ] **Handle multiple categories**: Note when checklist fits multiple categories

## 📝 4. Documentation Formatting

### Checklist Entry Formatting

- [ ] **Use bold for checklist names**: Format as `**checklist-name**`
- [ ] **Include title line**: Format as `- Title: [text]`
- [ ] **Include description line**: Format as `- Description: [text]`
- [ ] **Include category line**: Format as `- Category: [category]`
- [ ] **Include version line**: Format as `- Version: [version]`
- [ ] **Include purpose line**: Format as `- Purpose: [purpose]`
- [ ] **Include size (optional)**: Format as `- Size: [type] (N items, N sections)`
- [ ] **Use consistent indentation**: 2-space indent for metadata lines
- [ ] **Add blank line between checklists**: Separate checklist entries for readability

### Section Formatting

- [ ] **Use H3 for category headers**: Format as `### [Category] Checklists`
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

- [ ] **Documentation**: "Validate various types of documentation"
- [ ] **Quality**: "Ensure quality standards and completeness"
- [ ] **Development**: "Create OpenCode ecosystem resources"
- [ ] **Operations**: "Operational workflows and safety"
- [ ] **Process**: "Organizational processes and workflows"

### When to Use Guidance

- [ ] **Documentation**: "Creating or reviewing documentation"
- [ ] **Quality**: "Validating quality, discovering resources"
- [ ] **Development**: "Building new OpenCode resources"
- [ ] **Operations**: "Operations, deployments, workflows"
- [ ] **Process**: "Tool approval, ticket creation, processes"

### Special Notes

- [ ] **Flag meta checklists**: Note Development category checklists for creating resources
- [ ] **Indicate project overrides**: Show when project checklist overrides global
- [ ] **Highlight exhaustive checklists**: Note very comprehensive checklists (200+ items)
- [ ] **Show discovery checklists**: Indicate Quality category discovery checklists

## 📊 6. Summary Statistics

### Count Aggregation

- [ ] **Count total checklists**: Sum global + project checklists
- [ ] **Count global checklists**: Total from global directory
- [ ] **Count project checklists**: Total from project directory
- [ ] **Count by category**: Checklists per category
- [ ] **Calculate override count**: Number of project checklists overriding global
- [ ] **Count by size**: Number in each size category (quick/standard/comprehensive/exhaustive)

### Summary Formatting

- [ ] **Total count format**: `**Found N checklists total: N global, N project**`
- [ ] **Category breakdown**: Optional detailed breakdown by category
- [ ] **Position at end**: Place summary after all checklist listings
- [ ] **Use consistent formatting**: Bold for numbers, clear labels

## 🔧 7. Usage Information

### Checklist System Overview

- [ ] **Explain what checklists are**: Validation criteria for quality
- [ ] **Describe usage patterns**: Creation validation, review gates, process guides
- [ ] **Note checklist structure**: Markdown with checkbox items
- [ ] **Reference architecture doc**: Link to checklist-system-architecture

### Checklist Locations

- [ ] **Document global location**: `~/.config/opencode/checklist/`
- [ ] **Document project location**: `.opencode/checklist/`
- [ ] **Explain override behavior**: Project checklists override global with same name
- [ ] **Provide discovery commands**: Shell commands to list checklists

### Integration Information

- [ ] **Commands use checklists**: Explain command → checklist relationship
- [ ] **Tasks use checklists**: Explain task → checklist relationship
- [ ] **Agents use checklists**: Explain agent → checklist relationship
- [ ] **Templates validate checklists**: Explain template → checklist relationship
- [ ] **Reference format template**: Link to checklist-listing-format template

## ✅ 8. Quality Standards

### Completeness

- [ ] **All checklists discovered**: No checklists missed from either location
- [ ] **All metadata extracted**: Required fields present for all checklists
- [ ] **All categories covered**: Each category represented
- [ ] **All guidance included**: Category descriptions and usage guidance present
- [ ] **Summary accurate**: Counts match actual checklist numbers

### Accuracy

- [ ] **Metadata correct**: Frontmatter values accurately extracted
- [ ] **Categories valid**: All categories from standard list
- [ ] **Versions valid**: Semantic versioning format
- [ ] **Titles accurate**: Match frontmatter exactly
- [ ] **Descriptions accurate**: Match frontmatter exactly
- [ ] **Purpose appropriate**: Purpose reflects actual checklist function

### Formatting Consistency

- [ ] **Consistent checklist entry format**: All checklists follow same structure
- [ ] **Consistent heading levels**: H1, H2, H3 used appropriately
- [ ] **Consistent spacing**: Blank lines used uniformly
- [ ] **Consistent emphasis**: Bold used for checklist names only
- [ ] **Consistent indentation**: 2-space indent throughout

### Usability

- [ ] **Clear organization**: Logical category grouping
- [ ] **Readable format**: Not too dense or sparse
- [ ] **Helpful guidance**: Sufficient context for checklist selection
- [ ] **Easy navigation**: Clear section headers
- [ ] **Complete information**: All relevant details included

## 🔍 9. Validation Checks

### Pre-Output Validation

- [ ] **Verify file reads successful**: All checklist files successfully read
- [ ] **Verify frontmatter parsing**: YAML parsed without errors
- [ ] **Verify categorization complete**: All checklists assigned category
- [ ] **Verify counts accurate**: Manual count matches calculated count
- [ ] **Verify no duplicates**: No checklist listed multiple times

### Post-Output Validation

- [ ] **Review for typos**: Check spelling and grammar
- [ ] **Verify formatting**: Markdown renders correctly
- [ ] **Test links**: Ensure any links functional
- [ ] **Check completeness**: All discovered checklists present in output
- [ ] **Validate consistency**: Format consistent throughout

### Edge Case Handling

- [ ] **No checklists found**: Appropriate message displayed
- [ ] **Missing frontmatter**: Error or fallback handling
- [ ] **Invalid category**: Default or error handling
- [ ] **Malformed markdown**: Graceful error handling
- [ ] **File read errors**: Clear error messages

## 📚 10. Additional Documentation

### Related Resources

- [ ] **Link to checklist system architecture**: Reference knowledge base
- [ ] **Link to checklist template**: Reference opencode-checklist-tmpl.yaml
- [ ] **Link to example checklists**: Point to representative examples
- [ ] **Link to commands using checklists**: Reference relevant commands

### Usage Examples

- [ ] **Show discovery commands**: Provide working shell commands
- [ ] **Show output format**: Include sample formatted output
- [ ] **Show integration examples**: Demonstrate command/task/agent usage
- [ ] **Show common patterns**: Typical checklist selection scenarios

### Maintenance Notes

- [ ] **Review frequency**: Suggest when to re-run discovery
- [ ] **Update triggers**: List events requiring rediscovery
- [ ] **Version tracking**: Note how to handle version changes
- [ ] **Category changes**: Process for updating categories

---

## 🔍 Review Checklist

Before considering checklist discovery and documentation complete:

### Discovery Complete

- [ ] All global checklists discovered and documented
- [ ] All project checklists discovered and documented
- [ ] Override relationships identified
- [ ] No checklists missed or duplicated

### Metadata Accurate

- [ ] All frontmatter extracted correctly
- [ ] All required fields present
- [ ] All values validated
- [ ] No parsing errors
- [ ] Size estimates included

### Documentation Quality

- [ ] Consistent formatting throughout
- [ ] Clear categorization and organization
- [ ] Helpful guidance and context
- [ ] Accurate summary statistics
- [ ] Size information provided

### Usability Validated

- [ ] Easy to scan and find checklists
- [ ] Sufficient detail for checklist selection
- [ ] Clear integration guidance
- [ ] Links to additional resources

---

## References

- [Checklist System Architecture](../knowledge-base/checklist-system-architecture.md)
- [Checklist Listing Format Template](../template/checklist-listing-format-tmpl.yaml)
- [OpenCode Checklist Template](../template/opencode-checklist-tmpl.yaml)
- [List Checklists Command](../command/list-checklists.md)
