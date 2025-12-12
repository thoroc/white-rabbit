---
title: Task Discovery and Documentation Validation
description: Systematic checklist for discovering, documenting, and validating OpenCode tasks
type: checklist
category: documentation
version: 1.0.0
tags:
  - tasks
  - discovery
  - validation
  - documentation
reference: ../knowledge-base/task-system-architecture.md
applies_to:
  - task-documentation
  - task-discovery
  - command-development
last_updated: 2025-11-19
---

# Task Discovery and Documentation Validation

Comprehensive checklist for systematically discovering, documenting, and validating OpenCode tasks. Use this checklist when creating task listings, documenting tasks, or building commands/agents that work with tasks.

## Purpose

This checklist ensures:

- Complete task discovery from all locations
- Accurate metadata extraction
- Proper categorization and organization
- Consistent formatting
- Comprehensive documentation

## 📋 1. Task Discovery

### Global Task Discovery

- [ ] **List all global tasks**: Run `ls -1 ~/.config/opencode/task/*.md 2>/dev/null`
- [ ] **Extract task names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order tasks for consistent presentation
- [ ] **Count global tasks**: Track number of global tasks found
- [ ] **Handle empty case**: Gracefully handle no global tasks scenario

### Project Task Discovery

- [ ] **List all project tasks**: Run `ls -1 .opencode/task/*.md 2>/dev/null`
- [ ] **Extract task names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order tasks for consistent presentation
- [ ] **Count project tasks**: Track number of project tasks found
- [ ] **Handle empty case**: Display appropriate message if no project tasks found
- [ ] **Identify overrides**: Note which project tasks override global tasks

### Task File Validation

- [ ] **Verify file accessibility**: Confirm each task file can be read
- [ ] **Check file size**: Warn if task files unusually large (>500 lines)
- [ ] **Validate markdown format**: Ensure `.md` extension and valid markdown
- [ ] **Check for frontmatter**: Verify YAML frontmatter present

## 📖 2. Metadata Extraction

### Frontmatter Reading

- [ ] **Parse YAML frontmatter**: Extract frontmatter from each task file
- [ ] **Extract description field**: Read `description` from frontmatter
- [ ] **Extract category field**: Read `category` from frontmatter
- [ ] **Extract version field**: Read `version` from frontmatter
- [ ] **Extract mode field**: Verify `mode: task` present
- [ ] **Extract temperature field**: Read `temperature` if needed
- [ ] **Extract last_updated field**: Read `last_updated` date if present

### Metadata Validation

- [ ] **Verify required fields present**: Ensure description, mode, category, version exist
- [ ] **Validate description format**: Check description is concise (≤150 chars)
- [ ] **Validate category values**: Confirm category is one of: Analysis, Documentation, Development, Operations, Research
- [ ] **Validate version format**: Check semantic versioning (X.Y.Z format)
- [ ] **Validate mode value**: Ensure mode is "task"
- [ ] **Check for missing metadata**: Flag tasks with incomplete frontmatter

### Content Analysis

- [ ] **Identify task purpose**: Extract or infer task purpose from content
- [ ] **Determine when to use**: Identify appropriate use cases
- [ ] **Note special characteristics**: Flag meta tasks (creates resources)
- [ ] **Extract input requirements**: Identify required vs optional inputs
- [ ] **Count execution steps**: Verify task has 3-7 steps

## 🗂️ 3. Task Categorization

### Category Assignment

- [ ] **Analysis category**: Identify tasks analyzing codebases, infrastructure
  - [ ] technology-detection
  - [ ] infrastructure-analysis
  - [ ] deployment-strategy
  - [ ] project-context

- [ ] **Documentation category**: Identify documentation-related tasks
  - [ ] documentation-discovery

- [ ] **Development category**: Identify meta tasks creating resources
  - [ ] opencode-agent
  - [ ] opencode-command
  - [ ] opencode-task
  - [ ] opencode-checklist
  - [ ] opencode-knowledge-base
  - [ ] opencode-template

- [ ] **Operations category**: Identify CI/CD and deployment tasks
  - [ ] pipeline-architect

- [ ] **Research category**: Identify research and evaluation tasks
  - [ ] ai-tool-approval-research

### Category Organization

- [ ] **Group by category**: Organize tasks into category groups
- [ ] **Order categories logically**: Standard order: Analysis, Documentation, Development, Operations, Research
- [ ] **Sort within categories**: Alphabetize tasks within each category
- [ ] **Note uncategorized tasks**: Flag tasks without valid category

## 📝 4. Documentation Formatting

### Task Entry Formatting

- [ ] **Use bold for task names**: Format as `**task-name**`
- [ ] **Include description line**: Format as `- Description: [text]`
- [ ] **Include category line**: Format as `- Category: [category]`
- [ ] **Include version line**: Format as `- Version: [version]`
- [ ] **Include purpose line**: Format as `- Purpose: [purpose]`
- [ ] **Use consistent indentation**: 2-space indent for metadata lines
- [ ] **Add blank line between tasks**: Separate task entries for readability

### Section Formatting

- [ ] **Use H3 for category headers**: Format as `### [Category] Tasks`
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

- [ ] **Analysis**: "Tasks for analyzing codebases, infrastructure, and project context"
- [ ] **Documentation**: "Tasks for discovering and managing documentation"
- [ ] **Development**: "Tasks for creating OpenCode ecosystem resources (meta tasks)"
- [ ] **Operations**: "Tasks for CI/CD, deployment, and operational workflows"
- [ ] **Research**: "Tasks for research, evaluation, and approval processes"

### When to Use Guidance

- [ ] **Analysis**: "Understanding existing systems, technology stacks, deployment strategies"
- [ ] **Documentation**: "Before creating or updating documentation"
- [ ] **Development**: "Building new agents, commands, tasks, checklists, knowledge bases, templates"
- [ ] **Operations**: "Setting up pipelines, deployment automation"
- [ ] **Research**: "Tool evaluation, approval documentation generation"

### Special Notes

- [ ] **Flag meta tasks**: Note Development tasks create other resources
- [ ] **Indicate project overrides**: Show when project task overrides global
- [ ] **Highlight commonly used**: Note most frequently used tasks
- [ ] **Show task relationships**: Indicate when tasks invoke other tasks

## 📊 6. Summary Statistics

### Count Aggregation

- [ ] **Count total tasks**: Sum global + project tasks
- [ ] **Count global tasks**: Total from global directory
- [ ] **Count project tasks**: Total from project directory
- [ ] **Count by category**: Tasks per category
- [ ] **Calculate override count**: Number of project tasks overriding global

### Summary Formatting

- [ ] **Total count format**: `**Found N tasks total: N global, N project**`
- [ ] **Category breakdown**: Optional detailed breakdown by category
- [ ] **Position at end**: Place summary after all task listings
- [ ] **Use consistent formatting**: Bold for numbers, clear labels

## 🔧 7. Usage Information

### Task System Overview

- [ ] **Explain what tasks are**: Multi-step workflows for complex operations
- [ ] **Describe invocation methods**: Commands, agents, other tasks
- [ ] **Note task structure**: 10-section standard structure
- [ ] **Reference architecture doc**: Link to task-system-architecture knowledge base

### Task Locations

- [ ] **Document global location**: `~/.config/opencode/task/`
- [ ] **Document project location**: `.opencode/task/`
- [ ] **Explain override behavior**: Project tasks override global with same name
- [ ] **Provide discovery commands**: Shell commands to list tasks

### Integration Information

- [ ] **Commands use tasks**: Explain command → task relationship
- [ ] **Agents use tasks**: Explain agent → task relationship
- [ ] **Tasks use tasks**: Explain task → task relationship
- [ ] **Reference template**: Link to task-listing-format template

## ✅ 8. Quality Standards

### Completeness

- [ ] **All tasks discovered**: No tasks missed from either location
- [ ] **All metadata extracted**: Required fields present for all tasks
- [ ] **All categories covered**: Each category represented
- [ ] **All guidance included**: Category descriptions and usage guidance present
- [ ] **Summary accurate**: Counts match actual task numbers

### Accuracy

- [ ] **Metadata correct**: Frontmatter values accurately extracted
- [ ] **Categories valid**: All categories from standard list
- [ ] **Versions valid**: Semantic versioning format
- [ ] **Descriptions accurate**: Match frontmatter exactly
- [ ] **Purpose appropriate**: Purpose reflects actual task function

### Formatting Consistency

- [ ] **Consistent task entry format**: All tasks follow same structure
- [ ] **Consistent heading levels**: H1, H2, H3 used appropriately
- [ ] **Consistent spacing**: Blank lines used uniformly
- [ ] **Consistent emphasis**: Bold used for task names only
- [ ] **Consistent indentation**: 2-space indent throughout

### Usability

- [ ] **Clear organization**: Logical category grouping
- [ ] **Readable format**: Not too dense or sparse
- [ ] **Helpful guidance**: Sufficient context for task selection
- [ ] **Easy navigation**: Clear section headers
- [ ] **Complete information**: All relevant details included

## 🔍 9. Validation Checks

### Pre-Output Validation

- [ ] **Verify file reads successful**: All task files successfully read
- [ ] **Verify frontmatter parsing**: YAML parsed without errors
- [ ] **Verify categorization complete**: All tasks assigned category
- [ ] **Verify counts accurate**: Manual count matches calculated count
- [ ] **Verify no duplicates**: No task listed multiple times

### Post-Output Validation

- [ ] **Review for typos**: Check spelling and grammar
- [ ] **Verify formatting**: Markdown renders correctly
- [ ] **Test links**: Ensure any links functional
- [ ] **Check completeness**: All discovered tasks present in output
- [ ] **Validate consistency**: Format consistent throughout

### Edge Case Handling

- [ ] **No tasks found**: Appropriate message displayed
- [ ] **Missing frontmatter**: Error or fallback handling
- [ ] **Invalid category**: Default or error handling
- [ ] **Malformed markdown**: Graceful error handling
- [ ] **File read errors**: Clear error messages

## 📚 10. Additional Documentation

### Related Resources

- [ ] **Link to task system architecture**: Reference knowledge base
- [ ] **Link to task template**: Reference opencode-task template
- [ ] **Link to example tasks**: Point to representative examples
- [ ] **Link to commands using tasks**: Reference relevant commands

### Usage Examples

- [ ] **Show discovery commands**: Provide working shell commands
- [ ] **Show output format**: Include sample formatted output
- [ ] **Show integration examples**: Demonstrate command/agent usage
- [ ] **Show common patterns**: Typical task selection scenarios

### Maintenance Notes

- [ ] **Review frequency**: Suggest when to re-run discovery
- [ ] **Update triggers**: List events requiring rediscovery
- [ ] **Version tracking**: Note how to handle version changes
- [ ] **Category changes**: Process for updating categories

---

## 🔍 Review Checklist

Before considering task discovery and documentation complete:

### Discovery Complete

- [ ] All global tasks discovered and documented
- [ ] All project tasks discovered and documented
- [ ] Override relationships identified
- [ ] No tasks missed or duplicated

### Metadata Accurate

- [ ] All frontmatter extracted correctly
- [ ] All required fields present
- [ ] All values validated
- [ ] No parsing errors

### Documentation Quality

- [ ] Consistent formatting throughout
- [ ] Clear categorization and organization
- [ ] Helpful guidance and context
- [ ] Accurate summary statistics

### Usability Validated

- [ ] Easy to scan and find tasks
- [ ] Sufficient detail for task selection
- [ ] Clear integration guidance
- [ ] Links to additional resources

---

## References

- [Task System Architecture](../knowledge-base/task-system-architecture.md)
- [Task Listing Format Template](../template/task-listing-format-tmpl.yaml)
- [OpenCode Task Template](../template/opencode-task-tmpl.yaml)
- [List Tasks Command](../command/list-tasks.md)
