---
title: Command Discovery and Documentation Validation
description: Systematic checklist for discovering, documenting, and validating OpenCode commands
type: checklist
category: documentation
version: 1.0.0
tags:
  - commands
  - discovery
  - validation
  - documentation
reference: ../knowledge-base/command-system-architecture.md
applies_to:
  - command-documentation
  - command-discovery
  - tui-development
last_updated: 2025-11-19
---

# Command Discovery and Documentation Validation

Comprehensive checklist for systematically discovering, documenting, and validating OpenCode commands. Use this checklist when creating command listings, documenting commands, or building TUI features that work with commands.

## Purpose

This checklist ensures:

- Complete command discovery from all locations
- Accurate metadata extraction
- Proper categorization and organization
- Consistent formatting
- Comprehensive documentation

## 📋 1. Command Discovery

### Global Command Discovery

- [ ] **List all global commands**: Run `ls -1 ~/.config/opencode/command/*.md 2>/dev/null`
- [ ] **Extract command names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order commands for consistent presentation
- [ ] **Count global commands**: Track number of global commands found
- [ ] **Handle empty case**: Gracefully handle no global commands scenario

### Project Command Discovery

- [ ] **List all project commands**: Run `ls -1 .opencode/command/*.md 2>/dev/null`
- [ ] **Extract command names**: Strip `.md` extension from filenames
- [ ] **Sort alphabetically**: Order commands for consistent presentation
- [ ] **Count project commands**: Track number of project commands found
- [ ] **Handle empty case**: Display appropriate message if no project commands found
- [ ] **Identify overrides**: Note which project commands override global commands

### Command File Validation

- [ ] **Verify file accessibility**: Confirm each command file can be read
- [ ] **Check file size**: Note if command files unusually large (>500 lines)
- [ ] **Validate markdown format**: Ensure `.md` extension and valid markdown
- [ ] **Check for frontmatter**: Verify YAML frontmatter present

## 📖 2. Metadata Extraction

### Frontmatter Reading

- [ ] **Parse YAML frontmatter**: Extract frontmatter from each command file
- [ ] **Extract description field**: Read `description` from frontmatter
- [ ] **Extract agent field**: Read `agent` from frontmatter
- [ ] **Extract subtask field**: Read `subtask` if present
- [ ] **Extract model field**: Read `model` if present (custom model)
- [ ] **Extract temperature field**: Read `temperature` if present

### Metadata Validation

- [ ] **Verify required fields present**: Ensure description and agent exist
- [ ] **Validate description format**: Check description is concise (≤100 chars preferred)
- [ ] **Validate agent value**: Confirm agent exists in available agents
- [ ] **Validate subtask value**: Check subtask is boolean if present
- [ ] **Check for missing metadata**: Flag commands with incomplete frontmatter

### Content Analysis

- [ ] **Identify command purpose**: Extract or infer command purpose
- [ ] **Determine command category**: Classify command type
- [ ] **Note special attributes**: Flag subtasks, custom models, etc.
- [ ] **Check for resource references**: Note templates, tasks, checklists, KBs used
- [ ] **Identify command arguments**: Note if command accepts arguments

## 🗂️ 3. Command Categorization

### Category Assignment

- [ ] **Documentation category**: Identify documentation generation commands
  - [ ] api-docs
  - [ ] arch-docs
  - [ ] dev-docs
  - [ ] deploy-docs
  - [ ] pipeline-docs
  - [ ] onboard-docs

- [ ] **Development category**: Identify resource creation commands
  - [ ] create-command
  - [ ] create-agent
  - [ ] feature

- [ ] **Git category**: Identify version control commands
  - [ ] commit
  - [ ] gh-flow

- [ ] **Analysis category**: Identify analysis and research commands
  - [ ] research
  - [ ] document

- [ ] **Workflow category**: Identify process workflow commands
  - [ ] create-ticket
  - [ ] review-tool

- [ ] **Utility category**: Identify helper and utility commands
  - [ ] list-commands
  - [ ] list-tasks
  - [ ] list-templates
  - [ ] list-knowledge-bases
  - [ ] list-checklists
  - [ ] docs-help

- [ ] **Session category**: Identify session management commands
  - [ ] save-session
  - [ ] resume-session
  - [ ] list-sessions
  - [ ] update-session

### Category Organization

- [ ] **Group by category**: Organize commands into category groups
- [ ] **Order categories logically**: Standard order: Documentation, Development, Git, Analysis, Workflow, Utility, Session
- [ ] **Sort within categories**: Alphabetize commands within each category
- [ ] **Note uncategorized commands**: Flag commands without clear category

## 📝 4. Documentation Formatting

### Command Entry Formatting

- [ ] **Use / prefix**: Format as `/command-name`
- [ ] **Include description**: Format as `- /command-name - Description`
- [ ] **Include agent (optional)**: Format as `(agent: agent-name)` when relevant
- [ ] **Include special flags**: Format as `[subtask]` or `[custom-model]` when applicable
- [ ] **Use consistent spacing**: One line per command
- [ ] **Add blank line between categories**: Separate categories for readability

### Section Formatting

- [ ] **Use H3 for category headers**: Format as `### [Category] Commands`
- [ ] **Add category description**: Brief explanation of category purpose
- [ ] **Use consistent spacing**: Blank line before/after sections
- [ ] **Add horizontal rules**: Use `---` to separate major sections

### Code Examples

- [ ] **Format command invocations**: Use inline code for `/command`
- [ ] **Format arguments**: Show argument syntax clearly
- [ ] **Include usage examples**: Demonstrate command invocation
- [ ] **Show expected output**: Include sample output where helpful

## 🎯 5. Category Guidance

### Category Descriptions

- [ ] **Documentation**: "Generate or improve documentation"
- [ ] **Development**: "Create or modify code and resources"
- [ ] **Git**: "Git operations and GitHub integration"
- [ ] **Analysis**: "Analyze code, projects, or resources"
- [ ] **Workflow**: "Execute specific workflows"
- [ ] **Utility**: "Helper commands and utilities"
- [ ] **Session**: "Manage OpenCode sessions"

### When to Use Guidance

- [ ] **Documentation**: "Creating or updating project documentation"
- [ ] **Development**: "Building or extending functionality"
- [ ] **Git**: "Version control operations"
- [ ] **Analysis**: "Understanding or investigating systems"
- [ ] **Workflow**: "Standardized processes"
- [ ] **Utility**: "Discovery and help"
- [ ] **Session**: "Session persistence and management"

### Special Notes

- [ ] **Flag subtasks**: Note commands marked `subtask: true`
- [ ] **Indicate project overrides**: Show when project command overrides global
- [ ] **Highlight custom models**: Note commands with custom model configuration
- [ ] **Show agent assignments**: Display agent for context when relevant

## 📊 6. Summary Statistics

### Count Aggregation

- [ ] **Count total commands**: Sum global + project commands
- [ ] **Count global commands**: Total from global directory
- [ ] **Count project commands**: Total from project directory
- [ ] **Count by category**: Commands per category
- [ ] **Calculate override count**: Number of project commands overriding global
- [ ] **Count subtasks**: Number of internal commands

### Summary Formatting

- [ ] **Total count format**: `**Found N commands total: N global, N project**`
- [ ] **Category breakdown**: Optional detailed breakdown by category
- [ ] **Position at end**: Place summary after all command listings
- [ ] **Use consistent formatting**: Bold for numbers, clear labels

## 🔧 7. Usage Information

### Command System Overview

- [ ] **Explain what commands are**: Slash commands for workflows
- [ ] **Describe invocation**: Type `/` in TUI for autocomplete
- [ ] **Note command structure**: Markdown with frontmatter
- [ ] **Reference architecture doc**: Link to command-system-architecture

### Command Locations

- [ ] **Document global location**: `~/.config/opencode/command/`
- [ ] **Document project location**: `.opencode/command/`
- [ ] **Explain override behavior**: Project commands override global with same name
- [ ] **Provide discovery commands**: Shell commands to list commands

### Integration Information

- [ ] **TUI integration**: Explain autocomplete functionality
- [ ] **Agent execution**: Explain how agents execute commands
- [ ] **Task orchestration**: Explain command → task relationship
- [ ] **Resource loading**: Explain template/checklist/KB usage
- [ ] **Reference format template**: Link to command-listing-format template

## ✅ 8. Quality Standards

### Completeness

- [ ] **All commands discovered**: No commands missed from either location
- [ ] **All metadata extracted**: Required fields present for all commands
- [ ] **All categories covered**: Each category represented
- [ ] **All guidance included**: Category descriptions and usage guidance present
- [ ] **Summary accurate**: Counts match actual command numbers

### Accuracy

- [ ] **Metadata correct**: Frontmatter values accurately extracted
- [ ] **Categories valid**: All categories from standard list
- [ ] **Agent references valid**: All agents exist
- [ ] **Descriptions accurate**: Match frontmatter exactly
- [ ] **Special attributes noted**: Subtasks, custom models flagged

### Formatting Consistency

- [ ] **Consistent command entry format**: All commands follow same structure
- [ ] **Consistent heading levels**: H1, H2, H3 used appropriately
- [ ] **Consistent spacing**: Blank lines used uniformly
- [ ] **Consistent emphasis**: Format commands consistently
- [ ] **Always use / prefix**: All command names include slash

### Usability

- [ ] **Clear organization**: Logical category grouping
- [ ] **Readable format**: Not too dense or sparse
- [ ] **Helpful guidance**: Sufficient context for command selection
- [ ] **Easy navigation**: Clear section headers
- [ ] **Complete information**: All relevant details included

## 🔍 9. Validation Checks

### Pre-Output Validation

- [ ] **Verify file reads successful**: All command files successfully read
- [ ] **Verify frontmatter parsing**: YAML parsed without errors
- [ ] **Verify categorization complete**: All commands assigned category
- [ ] **Verify counts accurate**: Manual count matches calculated count
- [ ] **Verify no duplicates**: No command listed multiple times

### Post-Output Validation

- [ ] **Review for typos**: Check spelling and grammar
- [ ] **Verify formatting**: Markdown renders correctly
- [ ] **Test command names**: Ensure names match files exactly
- [ ] **Check completeness**: All discovered commands present in output
- [ ] **Validate consistency**: Format consistent throughout

### Edge Case Handling

- [ ] **No commands found**: Appropriate message displayed
- [ ] **Missing frontmatter**: Error or fallback handling
- [ ] **Invalid agent**: Default or error handling
- [ ] **Malformed markdown**: Graceful error handling
- [ ] **File read errors**: Clear error messages

## 📚 10. Additional Documentation

### Related Resources

- [ ] **Link to command system architecture**: Reference knowledge base
- [ ] **Link to command template**: Reference opencode-command-tmpl.yaml
- [ ] **Link to example commands**: Point to representative examples
- [ ] **Link to TUI documentation**: Reference TUI usage guide

### Usage Examples

- [ ] **Show discovery commands**: Provide working shell commands
- [ ] **Show output format**: Include sample formatted output
- [ ] **Show invocation examples**: Demonstrate command usage
- [ ] **Show autocomplete**: Explain TUI autocomplete

### Maintenance Notes

- [ ] **Review frequency**: Suggest when to re-run discovery
- [ ] **Update triggers**: List events requiring rediscovery
- [ ] **Category changes**: Process for updating categories
- [ ] **New command integration**: Process for adding new commands

---

## 🔍 Review Checklist

Before considering command discovery and documentation complete:

### Discovery Complete

- [ ] All global commands discovered and documented
- [ ] All project commands discovered and documented
- [ ] Override relationships identified
- [ ] No commands missed or duplicated

### Metadata Accurate

- [ ] All frontmatter extracted correctly
- [ ] All required fields present
- [ ] All values validated
- [ ] No parsing errors
- [ ] Special attributes noted

### Documentation Quality

- [ ] Consistent formatting throughout
- [ ] Clear categorization and organization
- [ ] Helpful guidance and context
- [ ] Accurate summary statistics
- [ ] All commands use / prefix

### Usability Validated

- [ ] Easy to scan and find commands
- [ ] Sufficient detail for command selection
- [ ] Clear integration guidance
- [ ] Links to additional resources
- [ ] TUI autocomplete friendly

---

## References

- [Command System Architecture](../knowledge-base/command-system-architecture.md)
- [Command Listing Format Template](../template/command-listing-format-tmpl.yaml)
- [OpenCode Command Template](../template/opencode-command-tmpl.yaml)
- [List Commands Command](../command/list-commands.md)
