---
title: Template Discovery and Documentation Validation
description: Systematic checklist for discovering, documenting, and validating OpenCode templates
type: checklist
category: documentation
version: 1.0.0
tags:
    - templates
    - discovery
    - validation
    - documentation
reference: ../knowledge-base/template-system-architecture.md
applies_to:
    - template-documentation
    - template-discovery
    - command-development
last_updated: 2025-11-19
---

# Template Discovery and Documentation Validation

Comprehensive checklist for systematically discovering, documenting, and validating OpenCode templates. Use this checklist when creating template listings, documenting templates, or building commands/agents that work with templates.

## Purpose

This checklist ensures:

- Complete template discovery from all locations
- Accurate metadata extraction
- Proper categorization and organization
- Consistent formatting
- Comprehensive documentation

## 📋 1. Template Discovery

### Global Template Discovery

- [ ] **List all global templates**: Run `ls -1 ~/.config/opencode/template/*.yaml 2>/dev/null`
- [ ] **Extract template filenames**: Keep complete filenames with `.yaml` extension
- [ ] **Sort alphabetically**: Order templates for consistent presentation
- [ ] **Count global templates**: Track number of global templates found
- [ ] **Handle empty case**: Gracefully handle no global templates scenario

### Project Template Discovery

- [ ] **List all project templates**: Run `ls -1 .opencode/template/*.yaml 2>/dev/null`
- [ ] **Extract template filenames**: Keep complete filenames with `.yaml` extension
- [ ] **Sort alphabetically**: Order templates for consistent presentation
- [ ] **Count project templates**: Track number of project templates found
- [ ] **Handle empty case**: Display appropriate message if no project templates found
- [ ] **Identify overrides**: Note which project templates override global templates

### Template File Validation

- [ ] **Verify file accessibility**: Confirm each template file can be read
- [ ] **Check file size**: Warn if template files unusually large (>600 lines)
- [ ] **Validate YAML format**: Ensure `.yaml` extension and valid YAML syntax
- [ ] **Check for metadata**: Verify template metadata fields present

## 📖 2. Metadata Extraction

### YAML Parsing

- [ ] **Parse YAML content**: Extract YAML from each template file
- [ ] **Extract template_title field**: Read `template_title` from template
- [ ] **Extract template_description field**: Read `template_description` from template
- [ ] **Extract template_version field**: Read `template_version` from template
- [ ] **Extract template_category field**: Read `template_category` if present
- [ ] **Extract last_updated field**: Read `last_updated` date if present
- [ ] **Extract reference field**: Read `reference` path if present

### Metadata Validation

- [ ] **Verify required fields present**: Ensure title, description, version exist
- [ ] **Validate title format**: Check title is descriptive (≤80 chars)
- [ ] **Validate description format**: Check description is concise (≤150 chars)
- [ ] **Validate version format**: Check semantic versioning (X.Y.Z format)
- [ ] **Validate category values**: Confirm category is one of: meta, documentation, workflow, reference, domain
- [ ] **Check for missing metadata**: Flag templates with incomplete metadata

### Content Analysis

- [ ] **Identify template purpose**: Extract or infer template purpose
- [ ] **Determine when to use**: Identify appropriate use cases
- [ ] **Note special characteristics**: Flag meta-templates (creates resources)
- [ ] **Identify template type**: Structural, content, format, reference, or meta
- [ ] **Check for examples**: Verify template includes working examples

## 🗂️ 3. Template Categorization

### Category Assignment

- [ ] **OpenCode Resource Templates**: Identify meta-templates creating resources
    - [ ] opencode-agent-tmpl.yaml
    - [ ] opencode-command-tmpl.yaml
    - [ ] opencode-task-tmpl.yaml
    - [ ] opencode-checklist-tmpl.yaml
    - [ ] opencode-knowledge-base-tmpl.yaml
    - [ ] opencode-template-tmpl.yaml

- [ ] **Documentation Templates**: Identify documentation structure templates
    - [ ] standard-doc-structure-tmpl.yaml

- [ ] **Workflow Templates**: Identify process and workflow templates
    - [ ] jira-ticket-description-tmpl.yaml
    - [ ] ai-tool-assessment-report-tmpl.yaml
    - [ ] ai-tool-rfc-submission-tmpl.yaml

- [ ] **Reference Templates**: Identify quick reference templates
    - [ ] common-shell-commands-tmpl.yaml
    - [ ] task-reference-template-tmpl.yaml
    - [ ] task-listing-format-tmpl.yaml
    - [ ] template-listing-format-tmpl.yaml

- [ ] **Domain-Specific Templates**: Identify specialized domain templates
    - [ ] AI tool approval templates
    - [ ] Pipeline configuration templates
    - [ ] Security assessment templates

### Category Organization

- [ ] **Group by category**: Organize templates into category groups
- [ ] **Order categories logically**: Standard order: OpenCode Resources, Documentation, Workflow, Reference, Domain-Specific
- [ ] **Sort within categories**: Alphabetize templates within each category
- [ ] **Note uncategorized templates**: Flag templates without valid category
- [ ] **Handle overlapping categories**: Note when template fits multiple categories

## 📝 4. Documentation Formatting

### Template Entry Formatting

- [ ] **Use bold for template names**: Format as `**template-name.yaml**`
- [ ] **Include title line**: Format as `- Title: [text]`
- [ ] **Include description line**: Format as `- Description: [text]`
- [ ] **Include category line**: Format as `- Category: [category]` (optional)
- [ ] **Include purpose line**: Format as `- Purpose: [purpose]`
- [ ] **Use consistent indentation**: 2-space indent for metadata lines
- [ ] **Add blank line between templates**: Separate template entries for readability

### Section Formatting

- [ ] **Use H3 for category headers**: Format as `### [Category] Templates`
- [ ] **Add category description**: Brief explanation of category purpose
- [ ] **Add "when to use" guidance**: Explain appropriate use cases
- [ ] **Use consistent spacing**: Blank line before/after sections
- [ ] **Add horizontal rules**: Use `---` to separate major sections

### Code Examples

- [ ] **Format shell commands**: Use triple backticks with `bash` language
- [ ] **Format YAML excerpts**: Use triple backticks with `yaml` language
- [ ] **Include comments in code**: Explain what commands do
- [ ] **Show expected output**: Include sample output where helpful

## 🎯 5. Category Guidance

### Category Descriptions

- [ ] **OpenCode Resources**: "Templates for creating OpenCode ecosystem resources (meta-templates)"
- [ ] **Documentation**: "Templates for documentation structure and content"
- [ ] **Workflow**: "Templates for specific workflows and processes"
- [ ] **Reference**: "Templates providing reference information and patterns"
- [ ] **Domain-Specific**: "Templates for specialized domains and use cases"

### When to Use Guidance

- [ ] **OpenCode Resources**: "Building new agents, commands, tasks, checklists, knowledge bases, or templates"
- [ ] **Documentation**: "Creating or standardizing project documentation"
- [ ] **Workflow**: "Executing standardized workflows (ticket creation, tool approval, etc.)"
- [ ] **Reference**: "Need quick lookup or format guidance"
- [ ] **Domain-Specific**: "Working in specialized domains (AI tools, pipelines, security, etc.)"

### Special Notes

- [ ] **Flag meta-templates**: Note OpenCode Resource templates create other resources
- [ ] **Indicate project overrides**: Show when project template overrides global
- [ ] **Highlight commonly used**: Note most frequently used templates
- [ ] **Show template relationships**: Indicate when templates reference other templates

## 📊 6. Summary Statistics

### Count Aggregation

- [ ] **Count total templates**: Sum global + project templates
- [ ] **Count global templates**: Total from global directory
- [ ] **Count project templates**: Total from project directory
- [ ] **Count by category**: Templates per category
- [ ] **Calculate override count**: Number of project templates overriding global

### Summary Formatting

- [ ] **Total count format**: `**Found N templates total: N global, N project**`
- [ ] **Category breakdown**: Optional detailed breakdown by category
- [ ] **Position at end**: Place summary after all template listings
- [ ] **Use consistent formatting**: Bold for numbers, clear labels

## 🔧 7. Usage Information

### Template System Overview

- [ ] **Explain what templates are**: Structured guidance for consistent resources
- [ ] **Describe usage patterns**: Creation, validation, learning, formatting
- [ ] **Note template structure**: YAML format with standard sections
- [ ] **Reference architecture doc**: Link to template-system-architecture knowledge base

### Template Locations

- [ ] **Document global location**: `~/.config/opencode/template/`
- [ ] **Document project location**: `.opencode/template/`
- [ ] **Explain override behavior**: Project templates override global with same name
- [ ] **Provide discovery commands**: Shell commands to list templates

### Integration Information

- [ ] **Commands use templates**: Explain command → template relationship
- [ ] **Tasks use templates**: Explain task → template relationship
- [ ] **Checklists validate templates**: Explain checklist → template relationship
- [ ] **Reference format template**: Link to template-listing-format template

## ✅ 8. Quality Standards

### Completeness

- [ ] **All templates discovered**: No templates missed from either location
- [ ] **All metadata extracted**: Required fields present for all templates
- [ ] **All categories covered**: Each category represented
- [ ] **All guidance included**: Category descriptions and usage guidance present
- [ ] **Summary accurate**: Counts match actual template numbers

### Accuracy

- [ ] **Metadata correct**: YAML values accurately extracted
- [ ] **Categories valid**: All categories from standard list
- [ ] **Versions valid**: Semantic versioning format
- [ ] **Titles accurate**: Match template_title exactly
- [ ] **Descriptions accurate**: Match template_description exactly
- [ ] **Purpose appropriate**: Purpose reflects actual template function

### Formatting Consistency

- [ ] **Consistent template entry format**: All templates follow same structure
- [ ] **Consistent heading levels**: H1, H2, H3 used appropriately
- [ ] **Consistent spacing**: Blank lines used uniformly
- [ ] **Consistent emphasis**: Bold used for template names only
- [ ] **Consistent indentation**: 2-space indent throughout
- [ ] **Include file extensions**: Always include `.yaml` extension

### Usability

- [ ] **Clear organization**: Logical category grouping
- [ ] **Readable format**: Not too dense or sparse
- [ ] **Helpful guidance**: Sufficient context for template selection
- [ ] **Easy navigation**: Clear section headers
- [ ] **Complete information**: All relevant details included

## 🔍 9. Validation Checks

### Pre-Output Validation

- [ ] **Verify file reads successful**: All template files successfully read
- [ ] **Verify YAML parsing**: YAML parsed without errors
- [ ] **Verify categorization complete**: All templates assigned category
- [ ] **Verify counts accurate**: Manual count matches calculated count
- [ ] **Verify no duplicates**: No template listed multiple times

### Post-Output Validation

- [ ] **Review for typos**: Check spelling and grammar
- [ ] **Verify formatting**: Markdown renders correctly
- [ ] **Test links**: Ensure any links functional
- [ ] **Check completeness**: All discovered templates present in output
- [ ] **Validate consistency**: Format consistent throughout

### Edge Case Handling

- [ ] **No templates found**: Appropriate message displayed
- [ ] **Missing metadata**: Error or fallback handling
- [ ] **Invalid category**: Default or error handling
- [ ] **Malformed YAML**: Graceful error handling
- [ ] **File read errors**: Clear error messages

## 📚 10. Additional Documentation

### Related Resources

- [ ] **Link to template system architecture**: Reference knowledge base
- [ ] **Link to template meta-template**: Reference opencode-template-tmpl.yaml
- [ ] **Link to example templates**: Point to representative examples
- [ ] **Link to commands using templates**: Reference relevant commands

### Usage Examples

- [ ] **Show discovery commands**: Provide working shell commands
- [ ] **Show output format**: Include sample formatted output
- [ ] **Show integration examples**: Demonstrate command/task usage
- [ ] **Show common patterns**: Typical template selection scenarios

### Maintenance Notes

- [ ] **Review frequency**: Suggest when to re-run discovery
- [ ] **Update triggers**: List events requiring rediscovery
- [ ] **Version tracking**: Note how to handle version changes
- [ ] **Category changes**: Process for updating categories

---

## 🔍 Review Checklist

Before considering template discovery and documentation complete:

### Discovery Complete

- [ ] All global templates discovered and documented
- [ ] All project templates discovered and documented
- [ ] Override relationships identified
- [ ] No templates missed or duplicated

### Metadata Accurate

- [ ] All YAML metadata extracted correctly
- [ ] All required fields present
- [ ] All values validated
- [ ] No parsing errors

### Documentation Quality

- [ ] Consistent formatting throughout
- [ ] Clear categorization and organization
- [ ] Helpful guidance and context
- [ ] Accurate summary statistics

### Usability Validated

- [ ] Easy to scan and find templates
- [ ] Sufficient detail for template selection
- [ ] Clear integration guidance
- [ ] Links to additional resources

---

## References

- [Template System Architecture](../knowledge-base/template-system-architecture.md)
- [Template Listing Format Template](../template/template-listing-format-tmpl.yaml)
- [OpenCode Template Meta-Template](../template/opencode-template-tmpl.yaml)
- [List Templates Command](../command/list-templates.md)
