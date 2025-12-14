# Resource Frontmatter Schema

## Overview

All resources in the OpenCode system should include YAML frontmatter with metadata that enables discovery, categorization, and intelligent resource loading.

## Schema Definition

### Core Fields (All Resource Types)

**REQUIRED:**

```yaml
description: string # One-line description (max 200 chars, shown in tool list)
type: ResourceType # Must match directory (agent|checklist|command|knowledge-base|task|template)
```

**RECOMMENDED:**

```yaml
category: string # Grouping: Documentation|Development|Operations|Quality|Security
tags: string[] # Keywords for search (minimum 2, maximum 10)
```

**OPTIONAL:**

```yaml
title: string # Human-readable title (defaults to filename)
version: string # Semantic version (default: 1.0.0)
last_updated: string # ISO date (auto-set if missing)
```

### Complete Example

```yaml
---
description: Comprehensive API documentation checklist with REST and GraphQL support
type: checklist
category: Documentation
version: 1.2.0
last_updated: 2025-11-19
tags: [api, rest, graphql, openapi, documentation]
reference: https://swagger.io/specification/
applies_to: [rest-api, graphql-api]
---
```

## Type-Specific Fields

### Agent-Specific

```yaml
mode: subagent # subagent|all|primary
temperature: 0.2 # LLM temperature (0.0-1.0)
tools: # Tool availability
    read: true
    write: true
    bash: true
permissions: # Permission controls
    bash:
        'rm *': deny
        '*': allow
```

### Checklist-Specific

```yaml
reference: string # URL or path to standards/RFCs
applies_to: string[] # Project types this applies to
```

### Knowledge Base-Specific

```yaml
difficulty: string # beginner|intermediate|advanced|expert
audience: string[] # Target audience (e.g., [developers, architects])
related_resources: string[] # Cross-references (relative paths)
```

### Task-Specific

```yaml
mode: task # Always "task" for task files
temperature: number # LLM temperature setting (0.0-1.0)
estimated_duration: string # Time estimate (e.g., "15-30 minutes")
prerequisites: string[] # Required before starting
```

### Template-Specific

```yaml
template_variables: string[] # Variables for substitution
output_format: string # Output format specification (e.g., markdown, yaml)
```

### Command-Specific

```yaml
agent: string # Agent to use (general|specific-agent)
subtask: boolean # Is this a subtask/helper command?
arguments: # Command arguments
    - name: focus
      description: Specific aspect to document
      optional: true
```

## Validation Rules

### Required Field Validation

- `description`: String, 1-200 characters
- `type`: Must be one of: agent, checklist, command, knowledge-base, task, template
- `type`: Must match the directory the resource is in

### Recommended Field Validation

- `category`: Should be one of: Documentation, Development, Operations, Quality, Security
- `tags`: Array of strings, minimum 2 tags, maximum 10 tags
- Each tag should be lowercase, alphanumeric with hyphens

### Optional Field Validation

- `version`: If provided, must follow semantic versioning (X.Y.Z)
- `last_updated`: If provided, must be valid ISO date (YYYY-MM-DD)

### Type-Specific Validation

- Type-specific fields validated according to resource type
- Unknown fields logged as warnings but don't fail validation

## Category Definitions

| Category          | Description                                         | Typical Types                       |
| ----------------- | --------------------------------------------------- | ----------------------------------- |
| **Documentation** | Documentation creation, maintenance, and standards  | checklist, knowledge-base, template |
| **Development**   | Software development, code quality, and engineering | agent, command, knowledge-base      |
| **Operations**    | Deployment, infrastructure, and operational tasks   | task, checklist, knowledge-base     |
| **Quality**       | Testing, validation, and quality assurance          | checklist, task                     |
| **Security**      | Security practices, audits, and compliance          | checklist, knowledge-base           |

## Tag Guidelines

### Good Tags

✅ Specific and descriptive:

- `api`, `rest`, `graphql`, `openapi`
- `jenkins`, `gitlab`, `github-actions`
- `deployment`, `production`, `staging`

✅ Technology names:

- `typescript`, `python`, `java`
- `docker`, `kubernetes`, `aws`

✅ Methodology:

- `ci-cd`, `testing`, `monitoring`
- `well-architected`, `security`

### Bad Tags

❌ Too generic:

- `general`, `misc`, `other`

❌ Too long:

- `comprehensive-api-documentation-guide`

❌ Redundant with type:

- `checklist`, `task`, `template` (already captured in `type`)

## Migration

### Using the Migration Script

```bash
# Dry run to preview changes
bun run scripts/migrate-frontmatter.ts --dry-run

# Migrate all resources
bun run scripts/migrate-frontmatter.ts

# Migrate specific type
bun run scripts/migrate-frontmatter.ts --type=checklist
```

### Manual Migration

1. Add `---` delimiter at start and end
2. Add required fields: `description`, `type`
3. Add recommended fields: `category`, `tags`
4. Add type-specific fields as needed
5. Validate with: `resource_info({ tool_name: "your_tool_name" })`

## Best Practices

### 1. Write Clear Descriptions

✅ Good:

```yaml
description: Comprehensive API documentation checklist with REST and GraphQL support
```

❌ Bad:

```yaml
description: API docs
```

### 2. Choose Appropriate Categories

- Use existing categories when possible
- Propose new categories only if needed
- Keep categories broad enough to group resources

### 3. Tag Thoughtfully

- Include 3-5 tags minimum
- Mix specific (rest, graphql) and general (api, documentation) tags
- Include technology names and methodologies

### 4. Maintain Version History

- Update `last_updated` when making changes
- Increment `version` following semantic versioning
- Document breaking changes in version increments

### 5. Cross-Reference Related Resources

```yaml
related_resources:
    - checklist/api-documentation.md
    - knowledge-base/api-design-patterns.md
    - task/api-testing.md
```

## Troubleshooting

### Frontmatter Not Recognized

**Issue:** Resource doesn't show metadata in `resource_info`

**Solutions:**

1. Check `---` delimiters at start and end
2. Validate YAML syntax (use online validator)
3. Ensure no tabs (use spaces for indentation)
4. Check for special characters in values

### Invalid Category

**Issue:** Category not recognized by system

**Solutions:**

1. Use one of the predefined categories
2. Check spelling and capitalization
3. Propose new category if truly needed

### Tags Not Searchable

**Issue:** Search doesn't find resource by tag

**Solutions:**

1. Ensure tags are lowercase
2. Check tag is in array format: `[tag1, tag2]`
3. Reload plugin to refresh index
4. Verify tag with `resource_info`

## References

- [Resource Loader Plugin](/Users/thomas.roche/.config/opencode/plugin/resource-loader/README.md)
- [Resource Enhancement Plan](/Users/thomas.roche/.config/opencode/context/plan/resource-loader-enhancements.md)
- [Migration Script](/Users/thomas.roche/.config/opencode/scripts/migrate-frontmatter.ts)
