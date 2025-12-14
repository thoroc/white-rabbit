---
title: OpenCode Schema System Architecture
description: Guide to the OpenCode schema validation system structure, patterns, and integration with templates
type: knowledge-base
category: meta
version: 1.0.0
tags:
    - schema
    - validation
    - json-schema
    - templates
related_resources:
    - ./template-system-architecture.md
    - ../schema/core/feature.schema.json
    - ../schema/core/research.schema.json
    - ../schema/opencode/agent.schema.json
    - ../schema/opencode/command.schema.json
last_updated: 2025-12-12
---

> Reference for understanding and working with the OpenCode schema validation system

## Overview

The OpenCode schema system provides JSON Schema-based validation for resources generated from templates. Schemas define structure, required fields, data types, and validation rules ensuring consistency and correctness of generated content.

**Key Characteristics:**

- JSON Schema format (Draft 2019-09 or 2020-12)
- Validates template-generated resources
- Reusable sub-schema definitions ($defs)
- Domain-organized (core/ and opencode/)
- Enforces required fields, types, and formats

## Schema Purpose

Schemas solve validation problems: structural integrity, type safety, completeness, format validation, and consistency across resources of the same type.

## Schema Structure

### Schema Declaration

Standard JSON Schema with $schema, $id, title, type, and required fields array.

### Reusable Definitions ($defs)

Define reusable sub-schemas for complex nested structures referenced via $ref.

### Property Definitions

Define properties with types, formats (date-time, uri, email), and constraints (minLength, minimum, maximum, pattern).

### Additional Properties

Control validation strictness:

- `additionalProperties: true` - Allow extra properties (flexible)
- `additionalProperties: false` - Strict validation (exact structure)

## Schema Organization

Schemas organized by domain following domain path convention:

### Core Schemas (`.opencode/schema/core/`)

- `feature.schema.json` - Feature document structure
- `research.schema.json` - Research document structure
- Missing: task, checklist, knowledge-base, template, task-reference-template

### OpenCode Schemas (`.opencode/schema/opencode/`)

- `agent.schema.json` - Agent frontmatter validation
- `command.schema.json` - Command frontmatter validation
- Missing: plugin, tool

### Dev Schemas (`.opencode/schema/dev/`)

- Missing: common-shell-commands, standard-doc-structure

## Schema Types and Patterns

### Pattern 1: Frontmatter Schema

**Purpose:** Validate YAML frontmatter in markdown files

**Structure:** Simple flat object, metadata fields, required fields enforcement, format validation (slugs, patterns)

**Reference:** `agent.schema.json:1`, `command.schema.json:1`

### Pattern 2: Full Document Schema

**Purpose:** Validate complete document including frontmatter and body

**Structure:** Top-level template metadata, frontmatter sub-schema, body sub-schema with sections, nested definitions

**Reference:** `feature.schema.json:1`, `research.schema.json:1`

### Pattern 3: Nested Object Schema

**Purpose:** Validate complex nested data structures

**Structure:** $defs for reusable sub-schemas, $ref references, nested arrays and objects, item-level validation

**Reference:** `feature.schema.json:19` (implementationTask), `feature.schema.json:28` (fileItem), `feature.schema.json:37` (riskItem)

## Schema-Template Relationship

Schemas and templates work together:

```
Template → Generate Content → Validate with Schema → Valid Resource
```

**Workflow:**

1. Template defines structure and placeholders
2. Agent/command fills template with values
3. Schema validates generated content
4. Valid resource persisted to output directory

### Template-Schema Correspondence

| Template                   | Schema                 | Purpose               |
| -------------------------- | ---------------------- | --------------------- |
| `feature-tmpl.yml`         | `feature.schema.json`  | Feature documents     |
| `research-tmpl.yml`        | `research.schema.json` | Research documents    |
| `agent-tmpl.yml`           | `agent.schema.json`    | Agent definitions     |
| `command-tmpl.yml`         | `command.schema.json`  | Command definitions   |
| `task-tmpl.yaml`           | (missing)              | Task definitions      |
| `checklist-tmpl.yaml`      | (missing)              | Checklist definitions |
| `knowledge-base-tmpl.yaml` | (missing)              | KB articles           |
| `template-tmpl.yaml`       | (missing)              | Template definitions  |

## Schema Validation Rules

### Required Fields

Fields that must be present defined in `required` array.

### Type Validation

Enforce specific data types: string, integer, number, boolean, array, object.

### Format Validation

Validate string formats: date-time, uri, email, plus custom patterns using regex.

### Constraint Validation

Apply constraints: minLength, maxLength, minimum, maximum, minItems, maxItems.

### Enumeration Validation

Restrict to specific values using `enum` keyword.

## Schema Best Practices

### Schema Creation

**DO:**

- Use consistent JSON Schema draft version
- Define reusable sub-schemas in $defs
- Set appropriate additionalProperties values
- Include descriptive titles and descriptions
- Reference related schemas in documentation

**DON'T:**

- Mix different JSON Schema draft versions
- Duplicate sub-schema definitions
- Use overly permissive validation
- Leave schemas without descriptions

### Schema Validation

**DO:**

- Validate all generated resources
- Keep schemas synchronized with templates
- Test schemas with valid and invalid data
- Version schemas on breaking changes

**DON'T:**

- Skip validation to save time
- Let schemas drift from templates
- Create schemas after resources are generated

### Schema Maintenance

**DO:**

- Review schemas when templates change
- Test schema changes thoroughly
- Document schema version changes

**DON'T:**

- Remove required fields without migration plan
- Change validation rules without testing
- Delete schemas still in use

## Common Schema Patterns

### Optional vs Required Fields

Balance flexibility and validation - require fields essential for resource functionality, make others optional.

### Flexible Object Properties

Use `additionalProperties: true` for user-extensible sections.

### Strict Validation

Use `additionalProperties: false` for system-critical sections.

### Array Item Validation

Always validate array items to ensure consistent structure.

## Integration Points

### With Templates

Templates define structure; schemas validate it.

**Reference:** `.opencode/template/core/feature-tmpl.yml:1` ↔ `.opencode/schema/core/feature.schema.json:1`

### With Validation Tools

External tools (ajv, yq) can validate using schemas. CLI validation, CI/CD integration, and editor schema support.

### With CI/CD Pipelines

Automated validation in continuous integration workflows.

### With Editor Integration

IDE schema validation support (VSCode yaml.schemas configuration).

## Creating New Schemas

When creating schemas for missing templates:

1. Identify template structure from corresponding template file
2. Extract required_fields from template
3. Map frontmatter properties to schema properties
4. Map body sections to schema body properties
5. Define $defs for complex nested structures
6. Set appropriate required fields array
7. Choose additionalProperties setting
8. Test validation with sample generated content
9. Reference template in schema $id or description

**Priority Order (based on template usage):**

1. `task.schema.json` (task-tmpl.yaml)
2. `checklist.schema.json` (checklist-tmpl.yaml)
3. `knowledge-base.schema.json` (knowledge-base-tmpl.yaml)
4. `template.schema.json` (template-tmpl.yaml)

## Troubleshooting

### Validation Fails on Valid Data

Check required fields match template, verify data types, review additionalProperties settings, test with minimal valid data.

### Schema Too Restrictive

Set `additionalProperties: true` where appropriate, move fields from required to optional.

### Schema Out of Sync with Template

Compare template required_fields with schema required array, update schema to match template structure, test with freshly generated content.

## Related Resources

- [Template System Architecture](./template-system-architecture.md)
- [Core Feature Schema](../schema/core/feature.schema.json)
- [Core Research Schema](../schema/core/research.schema.json)
- [OpenCode Agent Schema](../schema/opencode/agent.schema.json)
- [OpenCode Command Schema](../schema/opencode/command.schema.json)
- [JSON Schema Documentation](https://json-schema.org/)

---

**Category**: Meta | **Tags**: schema, validation, json-schema, templates | **Difficulty**: Intermediate | **Reading Time**: 6 minutes
