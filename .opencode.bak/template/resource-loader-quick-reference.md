---
title: Resource Loader Plugin Quick Reference
description: Quick reference for all Resource Loader tools and usage patterns
type: template
category: Reference
tags:
    - plugin
    - resource-loader
    - quick-reference
    - tools
    - cheat-sheet
---

# Resource Loader Plugin Quick Reference

## Tools Overview

| Tool                    | Purpose                         | Returns                  |
| ----------------------- | ------------------------------- | ------------------------ |
| `resource_list`         | List resources by type/category | Formatted resource list  |
| `resource_search`       | Search resources by query       | Matching resources       |
| `resource_load`         | Load resource into context      | Success/failure status   |
| `resource_unload`       | Remove resource from context    | Unload confirmation      |
| `resource_session_info` | View loaded resources           | List of loaded resources |

## Common Commands

### Discover Resources

```
# List all resources
resource_list()

# List knowledge-base only
resource_list(type: 'knowledge-base')

# List with category filter
resource_list(category: 'Documentation')

# Limit results
resource_list(limit: 10)
```

### Search Resources

```
# Search everywhere
resource_search(query: 'api')

# Search specific type
resource_search(query: 'deployment', type: 'task')

# Limit results
resource_search(query: 'documentation', limit: 5)
```

### Load & Manage

```
# Load a resource
resource_load(name: 'api-documentation', type: 'knowledge-base')

# Unload a resource
resource_unload(name: 'api-documentation')

# Check what's loaded
resource_session_info()
```

## Auto-Loading Patterns

### Reference Pattern

```
Use this pattern in messages to auto-load:
knowledge-base api-patterns
task deployment-strategy
template oauth-implementation
checklist pre-deployment
```

### Markdown Link Pattern

```
Use this pattern in messages or commands:
[api-patterns](resource)
[deployment-strategy](resource)
```

## Resource Types

### Knowledge Base

Location: `~/.config/opencode/knowledge-base/`
Use for: Patterns, guidelines, references
Pattern: `knowledge-base {name}`

### Task

Location: `~/.config/opencode/task/`
Use for: Workflows, procedures, processes
Pattern: `task {name}`

### Template

Location: `~/.config/opencode/template/`
Use for: Code templates, document templates
Pattern: `template {name}`

### Checklist

Location: `~/.config/opencode/checklist/`
Use for: Verification lists, review guides
Pattern: `checklist {name}`

## Search Tips

### By Content

```
resource_search(query: 'documentation')  # Matches titles/descriptions
resource_search(query: 'api')             # Searches all fields
```

### By Category

```
resource_list(category: 'Development')
resource_list(category: 'Documentation')
resource_list(category: 'Operations')
```

### By Type

```
resource_list(type: 'knowledge-base', limit: 10)
resource_list(type: 'template')
resource_list(type: 'checklist')
resource_list(type: 'task')
```

## Workflows

### Researcher Agent

```
1. resource_search(query: topic)
2. resource_load(name: top_result, type: 'knowledge-base')
3. [Use content for research]
4. resource_unload(name: top_result)
```

### Deployment Task

```
1. [command mentions deployment-strategy](resource)
2. [Auto-loads during execution]
3. [command mentions pre-deployment-checklist](resource)
4. [Auto-loads during execution]
5. [Resources available throughout]
```

### Documentation Task

```
1. resource_search(query: 'API design')
2. resource_load(name: 'api-design-patterns', type: 'knowledge-base')
3. [Generate documentation using pattern]
4. resource_unload(name: 'api-design-patterns')
```

## Frontmatter Template

Add this to your resource markdown files:

```yaml
---
title: Clear Title
description: One-line description
type: knowledge-base # or task, template, checklist
category: Development # or Documentation, Operations, Quality, Security
tags:
    - tag1
    - tag2
    - tag3
---
# Your Content Here
```

## Performance Tips

1. **Search first**: Verify resource exists before loading
2. **Limit results**: Use `limit` parameter to reduce output
3. **Unload early**: Remove resources when done
4. **Check status**: Use `resource_session_info()` to monitor
5. **Type filter**: Narrow search by type when possible

## Troubleshooting

| Problem               | Solution                                    |
| --------------------- | ------------------------------------------- |
| Resource not found    | Use `resource_search()` to verify it exists |
| Auto-load not working | Check pattern format: `type resource-name`  |
| Performance slow      | Reduce `limit`, unload unused resources     |
| Wrong resource loaded | Use `resource_unload()` and retry           |
| Resource corrupted    | Check file encoding (UTF-8) and frontmatter |

## Context Usage

### Efficient Loading

```
✅ Load what you need
✅ Use it
✅ Unload when done
```

### Memory Management

```
Before:   [empty context]
Load:     resource_load(name: 'doc', type: 'knowledge-base')
After:    [context has doc]
Unload:   resource_unload(name: 'doc')
Result:   [context cleared]
```

## Integration Points

### In Agents

```
Search → Load → Use → Unload
```

### In Commands

```
Reference [resource](resource) → Auto-load → Use → Auto-cleanup
```

### In Tasks

```
Mention resource-type name → Auto-load → Display → Cleanup on end
```

## Examples

### Example 1: Quick Search

```
Agent: "I need API patterns"
> resource_search(query: 'API patterns')
Returns: api-design-patterns, api-security, rest-best-practices
> resource_load(name: 'api-design-patterns', type: 'knowledge-base')
✅ Loaded into context
```

### Example 2: Deployment

```
Command content: "Follow [deployment-strategy](resource)"
> Plugin detects reference
> Auto-loads deployment-strategy
User sees: [resource loaded]
> resource_session_info()
Shows: deployment-strategy loaded
```

### Example 3: Cleanup

```
> resource_session_info()
Shows: api-patterns, security-checklist
> resource_unload(name: 'api-patterns')
✅ Unloaded
> resource_unload(name: 'security-checklist')
✅ Unloaded
> resource_session_info()
Shows: [empty]
```

## Default Limits

- `resource_list`: 50 results max
- `resource_search`: 20 results max
- Use `limit` parameter to adjust

## Supported Formats

- Markdown (.md) only
- YAML frontmatter required for discovery
- UTF-8 encoding
- Plain text content

---

For full documentation, see: `plugin/resource-loader/README.md`
For integration guide, see: `knowledge-base/resource-loader-integration-guide.md`
