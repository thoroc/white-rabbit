# Template Standardization Guide

This document explains the standardized structure for all OpenCode templates.

## Overview

All templates in `/template/` directory follow a consistent YAML structure that describes how to create specific types of documentation, configuration, or content files. The `new-template-tmpl.yaml` file serves as the canonical standard that all templates should follow.

## File Naming Convention

**Pattern:** `[type]-tmpl.yaml`

**Examples:**

- `checklist-tmpl.yaml` - Template for creating checklists
- `command-tmpl.yaml` - Template for creating commands
- `task-tmpl.yaml` - Template for creating tasks
- `knowledge-base-tmpl.yaml` - Template for creating knowledge bases

**Rules:**

- Use kebab-case (lowercase with hyphens)
- Always end with `-tmpl.yaml`
- Name should clearly indicate what type of content it describes

## Standard Structure

All templates MUST follow this structure:

### 1. Header Comment Block (Lines 1-2)

```yaml
# Template Name
# Brief description of what this template is for and how it should be used
```

**Purpose:** Provide immediate context when reading the file
**Format:** Single `#` comment, no YAML frontmatter markers (`---`)

### 2. Core Metadata (Required)

```yaml
title: '[Template Name]'
description: "Brief description of this template's purpose"
version: '1.0.0'
last_updated: 'YYYY-MM-DD'
category: '[Category]'
reference: '[Optional: URL or documentation reference]'
```

**Fields:**

- `title` - Human-readable name
- `description` - One-line summary of purpose
- `version` - Semantic version (MAJOR.MINOR.PATCH)
- `last_updated` - ISO date format (YYYY-MM-DD)
- `category` - Categorization for organization
- `reference` (optional) - Link to related documentation

### 3. Overview Section (Required)

```yaml
# Overview:
# [2-3 sentences explaining what this template defines and who should use it]
# [Explain the context in which this template is used]
```

**Purpose:** Provide context about the template's purpose
**Format:** Comment block under `# Overview:` heading

### 4. Structure Guidelines (Required)

```yaml
# Structure Guidelines:
# [Numbered list of key structural requirements]
# 1. [Guideline 1]
# 2. [Guideline 2]
```

**Purpose:** High-level guidance on how to use the template
**Format:** Comment block with numbered list

### 5. Main Content Sections

#### structure: (Required)

```yaml
structure:
  component_name:
    description: 'What this component is for'
    format: '[Format or pattern]'
    required: true # or false
```

**Purpose:** Define the core structure of what the template describes
**Format:** Nested YAML objects with descriptive keys

#### options: (If Applicable)

```yaml
options:
  option_name:
    description: 'What this option controls'
    type: 'string'
    required: false
    default: 'default value'
    example: 'option_name: example'
```

**Purpose:** Document configuration parameters
**When to include:** For templates that describe configurable content

#### guidelines: (Required)

```yaml
guidelines:
  when_to_use:
    - 'Use case 1'
    - 'Use case 2'

  when_not_to_use:
    - 'Anti-pattern 1'

  best_practices:
    - 'Best practice 1'
```

**Purpose:** Provide domain-specific guidance
**Format:** Nested lists under clear subcategories

#### content_principles: (If Applicable)

```yaml
content_principles:
  clarity: ['Principle 1', 'Principle 2']
  completeness: ['Principle 1', 'Principle 2']
  actionability: ['Principle 1', 'Principle 2']
  organization: ['Principle 1', 'Principle 2']
```

**Purpose:** Define principles for content quality
**When to include:** For templates that generate documentation or text

#### formatting: (If Applicable)

```yaml
formatting:
  markdown_elements:
    headings: ['# [Title]', '## [Section]', '### [Subsection]']
    emphasis: ['**[Bold]**', '_[Italic]_', '`[Code]`']
    lists: ['- Unordered', '1. Ordered', '  - Nested']
```

**Purpose:** Define formatting standards
**When to include:** For templates that produce markdown or formatted text

### 6. Examples (Required)

```yaml
example_basic: |
  [Simple example with minimal required fields]

example_complete: |
  [Comprehensive example with all fields]
```

**Purpose:** Show concrete usage
**Format:** Multi-line strings (`|`) with actual examples
**Requirement:** Include at least 1-2 examples

### 7. Supporting Sections (As Applicable)

#### common_patterns

```yaml
common_patterns:
  pattern_name:
    description: 'What this pattern is for'
    use_case: 'When to use'
    example: '[Example code]'
```

**When to include:** For templates with recurring patterns

#### types

```yaml
types:
  type_name:
    description: 'What distinguishes this type'
    use_case: 'When to use'
    characteristics: ['Char 1', 'Char 2']
```

**When to include:** For templates with variants

#### recommended_size

```yaml
recommended_size:
  minimum: '[Minimum]'
  typical: '[Standard]'
  maximum: '[Maximum]'
  note: 'Sizing guidance'
```

**When to include:** For templates with size considerations

### 8. Integration and Maintenance (Required)

#### integration

```yaml
integration:
  with_component_a: 'How this integrates'
  with_component_b: 'How this integrates'
```

**Purpose:** Explain how content integrates with other parts
**Format:** Key-value pairs for each integration point

#### maintenance

```yaml
maintenance:
  review_frequency: 'When to review'
  update_triggers: ['Trigger 1', 'Trigger 2']
  version_control: ['Guideline 1', 'Guideline 2']
```

**Purpose:** Define maintenance requirements
**Format:** Structured guidance on upkeep

### 9. Best Practices Summary (Required)

```yaml
best_practices:
  - 'Key practice 1'
  - 'Key practice 2'
  - 'Key practice 3'
```

**Purpose:** Condensed list of key practices
**Format:** Simple list of strings
**Requirement:** 3-10 practices

### 10. References (Optional but Recommended)

```yaml
references:
  - name: 'Reference Name'
    path: 'path/to/doc.md'
    purpose: 'What this provides'
```

**Purpose:** Link to related resources
**Format:** List of objects with name, path/url, and purpose

## Formatting Rules

### YAML Conventions

1. **No frontmatter markers** - Do NOT use `---` at the start
2. **2-space indentation** - Consistent throughout
3. **Comments for sections** - Use `# Section Name:` for major sections
4. **Descriptive keys** - Use clear, readable key names
5. **Multi-line strings** - Use `|` for multi-line content

### Comment Style

```yaml
# Major Section:
# Explanatory text about this section
# Can span multiple lines

section_key:
  # Inline comments for specific items
  item: 'value'
```

### String Values

- Use double quotes for strings with spaces or special characters
- Use plain strings (no quotes) for simple values
- Use `|` for multi-line strings (preserve line breaks)
- Use `>` for multi-line strings (fold to single line)

### Lists

```yaml
# Inline list
simple_list: ['item1', 'item2', 'item3']

# Block list (preferred for readability)
detailed_list:
  - 'Item 1 with description'
  - 'Item 2 with description'
  - 'Item 3 with description'
```

## Size Guidelines

**Target:** 250-300 lines per template  
**Minimum:** 225 lines (250 - 10%)  
**Maximum:** 330 lines (300 + 10%)  
**Tolerance:** ±10% allowed

**Rationale:** This range provides enough space for comprehensive coverage while keeping templates focused and maintainable.

**Breakdown by section:**

- Metadata and overview: 15-25 lines
- Structure and options: 40-80 lines
- Guidelines and principles: 40-60 lines
- Examples: 40-70 lines
- Supporting sections: 30-50 lines
- Maintenance and references: 15-25 lines

**When to split:** If a template exceeds 330 lines, consider splitting into multiple focused templates.

## Quality Checklist

Use this checklist when creating or reviewing templates:

### Structure

- [ ] Starts with comment block (no `---`)
- [ ] Includes all required metadata fields
- [ ] Has clear overview section
- [ ] Includes structure guidelines

### Content

- [ ] structure: section defines core components
- [ ] guidelines: section provides clear guidance
- [ ] Includes at least 2 working examples
- [ ] best_practices: section lists 3-10 practices

### Consistency

- [ ] Uses 2-space indentation
- [ ] Follows naming conventions
- [ ] Uses consistent comment style
- [ ] Maintains parallel structure with other templates

### Completeness

- [ ] Explains when to use the template
- [ ] Documents all configuration options
- [ ] Includes integration guidance
- [ ] Defines maintenance requirements

### Quality

- [ ] Clear, concise language
- [ ] No ambiguous instructions
- [ ] Examples are complete and accurate
- [ ] Links to related resources

## Migration Guide

### Converting Existing Templates

To bring an existing template into compliance:

1. **Remove frontmatter markers** - Delete `---` lines
2. **Add header comment** - 2-line comment at top
3. **Verify metadata** - Ensure all required fields present
4. **Add missing sections** - Compare to standard structure
5. **Standardize formatting** - Fix indentation, comments
6. **Add examples** - Include working examples if missing
7. **Update references** - Link to related templates
8. **Verify size** - Aim for 150-400 lines

### Example Conversion

**Before:**

```yaml
---
title: Old Template
---
Some content here
```

**After:**

```yaml
# Old Template
# Brief description

title: 'Old Template'
description: 'Brief description'
version: '1.0.0'
last_updated: '2025-11-11'
category: 'Category'

# Overview:
# Explanation of template purpose

structure:
  # Core structure
```

## Template Categories

Current template categories and their purposes:

| Category      | Purpose            | Examples                                      |
| ------------- | ------------------ | --------------------------------------------- |
| Documentation | Creating docs      | checklist, knowledge-base                     |
| Development   | Dev workflows      | task, command                                 |
| Operations    | Ops and deployment | deployment-docs                               |
| Configuration | Setup and config   | command, agent                                |
| Assessment    | Evaluation         | ai-tool-assessment                            |
| Communication | Team collaboration | jira-ticket                                   |
| Reference     | Quick lookup       | common-shell-commands, standard-doc-structure |

## Versioning

**Semantic Versioning:**

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes to structure
- **MINOR** (1.0.0 → 1.1.0): New sections or options added
- **PATCH** (1.0.0 → 1.0.1): Fixes, clarifications, examples

**When to increment:**

- Change structure: MAJOR
- Add optional section: MINOR
- Fix typo or add example: PATCH
- Update last_updated: Always (even for PATCH)

## Maintenance

### Review Schedule

- **Quarterly:** Review for accuracy and completeness
- **On changes:** Update when related docs change
- **Annually:** Comprehensive review of all templates

### Update Triggers

- New features in OpenCode
- Changes to related documentation
- User feedback or issues
- Discovery of new best practices
- Changes to referenced external resources

## Best Practices

1. **Keep it focused** - Each template should have a single, clear purpose
2. **Be comprehensive** - Cover all necessary aspects, but don't bloat
3. **Use examples liberally** - Show, don't just tell
4. **Link generously** - Connect to related templates and docs
5. **Maintain consistency** - Follow the standard structure
6. **Update regularly** - Keep content current and accurate
7. **Think about users** - Write for people who will use the template
8. **Test examples** - Ensure all examples work as shown
9. **Version properly** - Use semantic versioning correctly
10. **Document changes** - Note what changed and why

## Common Mistakes to Avoid

1. ❌ Using frontmatter markers (`---`)
2. ❌ Inconsistent indentation
3. ❌ Missing required metadata fields
4. ❌ No examples or incomplete examples
5. ❌ Vague or ambiguous guidance
6. ❌ Overly verbose explanations
7. ❌ Missing integration information
8. ❌ No maintenance guidance
9. ❌ Broken or missing references
10. ❌ Outdated version numbers

## Resources

- **Standard Template:** `new-template-tmpl.yaml`
- **Template Directory:** `.opencode/template/`
- **Documentation:** This file
- **OpenCode Docs:** <https://opencode.ai/docs/>

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-11  
**Maintained By:** OpenCode Configuration Team
