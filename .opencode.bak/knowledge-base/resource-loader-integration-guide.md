---
title: Resource Loader Plugin Integration Guide
description: Complete guide to using the Resource Loader plugin for dynamic resource management
type: knowledge-base
category: Development
tags:
  - plugin
  - resource-loader
  - integration
  - agents
  - commands
---

# Resource Loader Plugin Integration Guide

## Overview

The Resource Loader Plugin automatically discovers, loads, and manages resources from your OpenCode config directories. It provides tools for agents and commands to dynamically access knowledge bases, templates, tasks, and checklists at runtime.

## Installation

The plugin is located at:

```
~/.config/opencode/plugin/resource-loader/
```

To enable it, add to your `opencode.json`:

```json
{
  "plugin": ["file://~/.config/opencode/plugin/resource-loader"]
}
```

## Quick Start

### 1. List Available Resources

```
Use resource_list() to see all available resources
```

This will show all resources grouped by type:

- Tasks
- Templates
- Knowledge Bases
- Checklists

### 2. Search for Resources

```
Use resource_search(query: 'api documentation') to find resources
```

The search will match:

- Resource names
- Titles
- Descriptions
- Tags
- Categories

### 3. Load a Resource

```
Use resource_load(name: 'api-documentation', type: 'knowledge-base')
```

Once loaded, the resource appears in your session context and is available for reference.

### 4. Check Session Resources

```
Use resource_session_info() to see what's loaded
```

This shows all resources currently loaded in your session.

## Usage Patterns

### Pattern 1: Agent Discovery

Agents can discover and load relevant resources:

```typescript
// In your agent code:
1. Start with resource_search to find relevant resources
2. Load top results with resource_load
3. Use the loaded content to inform your responses
4. Call resource_unload when done to save memory
```

**Example Agent Flow:**

```
Agent: "I'll help you with API documentation"
> resource_search(query: 'API', type: 'knowledge-base', limit: 5)
> Shows: api-documentation, opencode-tools-reference, etc.
> resource_load(name: 'api-documentation', type: 'knowledge-base')
> [Now API documentation is available in context]
> resource_unload(name: 'api-documentation')
> [Clean up when done]
```

### Pattern 2: Command Auto-Loading

Commands can reference resources which auto-load:

```markdown
# Deploy Application

Please follow the deployment strategy outlined in [deployment-strategy](resource).

Before deploying, complete this [pre-deployment-checklist](resource).
```

When users run this command:

1. Plugin detects resource references
2. Auto-loads both resources
3. Resources appear in session history
4. Users can reference them throughout the session

### Pattern 3: Template with Embedded Resources

Templates can specify required resources:

```markdown
---
title: API Development Template
resources:
  knowledge-base:
    - api-design-patterns
    - opencode-tools-reference
  checklist:
    - api-documentation
---

# API Development

This template requires the following resources:

- knowledge-base api-design-patterns
- knowledge-base opencode-tools-reference
- checklist api-documentation

Use these resources as your guide when developing APIs.
```

### Pattern 4: Task with Resource References

Tasks can naturally reference resources:

```markdown
# Implement Authentication

## Resources

Refer to these resources:

- knowledge-base auth-patterns for design patterns
- template oauth-implementation for sample code
- checklist auth-security for security checklist

## Steps

1. Review knowledge-base auth-patterns
2. Follow template oauth-implementation
3. Verify against checklist auth-security
```

## Integration Examples

### Example 1: Researcher Agent

```typescript
// Pseudo-code for a researcher agent

async function researchTopic(topic: string) {
  // Search for relevant resources
  const results = await resource_search({
    query: topic,
    type: 'knowledge-base',
    limit: 10,
  });

  // Load top 3 results
  for (let i = 0; i < Math.min(3, results.resources.length); i++) {
    const resource = results.resources[i];
    await resource_load({
      name: resource.name,
      type: resource.type,
    });
  }

  // Use loaded resources to create summary
  const summary = await generateSummary(topic);

  // Clean up
  const sessionInfo = await resource_session_info();
  for (const r of sessionInfo.resources) {
    await resource_unload({ name: r.name });
  }

  return summary;
}
```

### Example 2: Documentation Generator

```typescript
// Pseudo-code for generating documentation

async function generateDocumentation(apiName: string) {
  // Find api design patterns
  const patterns = await resource_search({
    query: 'api design patterns',
    type: 'knowledge-base',
  });

  // Load pattern resource
  if (patterns.resources.length > 0) {
    await resource_load({
      name: patterns.resources[0].name,
      type: 'knowledge-base',
    });
  }

  // Find relevant template
  const templates = await resource_search({
    query: `${apiName} documentation`,
    type: 'template',
  });

  // Generate docs using patterns and templates
  const docs = await generateFromTemplates(apiName);

  return docs;
}
```

### Example 3: Deployment Checklist Runner

```typescript
// Pseudo-code for deployment verification

async function runDeploymentChecklist(environment: string) {
  // Load deployment checklist
  await resource_load({
    name: 'pre-deployment-checklist',
    type: 'checklist',
  });

  // Load deployment strategy
  await resource_load({
    name: 'deployment-strategy',
    type: 'knowledge-base',
  });

  // Run checklist
  const results = await runChecklist(environment);

  // Report with references
  return {
    results,
    references: await resource_session_info(),
  };
}
```

## Best Practices

### 1. Load When Needed

Only load resources when you need them:

```
✅ Good: Load resource, use it, unload it
❌ Bad: Load all resources at start
```

### 2. Unload After Use

Keep session context clean:

```
✅ Good: resource_unload(name) when done
❌ Bad: Leave resources loaded forever
```

### 3. Use Descriptive Names

Keep resource names clear for auto-loading:

```
✅ Good: api-design-patterns, oauth-implementation
❌ Bad: patterns, code, stuff
```

### 4. Add Frontmatter

Include complete frontmatter for discoverability:

```yaml
---
title: Clear Title
description: What this resource contains
category: Development
tags: [api, patterns, design]
---
```

### 5. Search Before Loading

Always search first to verify resource exists:

```
✅ Good: resource_search(query) → resource_load(result)
❌ Bad: resource_load(guessedName)
```

## Workflow Examples

### Workflow 1: API Documentation Task

```
1. Agent receives: "Create API documentation"
2. resource_search(query: 'API documentation')
3. resource_search(query: 'code examples')
4. resource_load both resources
5. Generate documentation
6. resource_unload both resources
7. Return documentation
```

### Workflow 2: Deployment Command

```
1. User runs deployment command
2. Command references [deployment-strategy](resource)
3. Plugin auto-loads deployment-strategy
4. Command references [pre-deployment-checklist](resource)
5. Plugin auto-loads pre-deployment-checklist
6. User follows steps from both resources
7. Session cleanup removes both on end
```

### Workflow 3: Code Review Checklist

```
1. resource_list(type: 'checklist')
2. User selects code-review-checklist
3. resource_load(name: 'code-review-checklist', type: 'checklist')
4. resource_search(query: 'code quality')
5. resource_load(name: 'code-quality-standards')
6. resource_session_info() shows both loaded
7. resource_unload both when done
```

## Troubleshooting

### Resource Not Discovered

1. Verify file location: `~/.config/opencode/{type}/`
2. Check filename: must be `.md`
3. Verify frontmatter is valid YAML:
   ```yaml
   ---
   title: Title
   description: Description
   ---
   ```

### Auto-Load Not Working

1. Use correct pattern: `{type} {resource-name}`
2. Check resource name matches exactly
3. Fallback: use `resource_load` explicitly
4. Verify pattern appears in message text

### Performance Issues

1. Limit search results: `limit: 10`
2. Unload unused resources
3. Use `resource_session_info()` to check usage
4. Search by type first: `type: 'knowledge-base'`

### Resource Content Missing

1. Verify file is not corrupted
2. Check file encoding (must be UTF-8)
3. Try `resource_search` to find similar resources
4. Use `resource_list` to verify resource exists

## Advanced Topics

### Caching

- Resources are cached per directory
- Cache persists for plugin lifetime
- Manual refresh: restart plugin
- No TTL on cache

### Session Isolation

- Each session has isolated resource context
- Resources loaded in session A don't appear in session B
- Automatic cleanup on session deletion
- Memory efficient per-session management

### Resource Metadata

Resources are indexed by frontmatter:

- `title`: Display name
- `description`: One-line summary
- `type`: Resource type
- `category`: Organizational grouping
- `tags`: Search keywords

### Patterns vs Explicit Loading

- **Auto-load patterns**: `knowledge-base api-patterns` or `[api-patterns](resource)`
- **Explicit loading**: `resource_load(name: 'api-patterns', type: 'knowledge-base')`
- **Hybrid**: Use both - patterns for common cases, explicit for others

## Integration with OpenCode Features

### With Agents

Agents can:

- Search for domain-specific resources
- Load context-appropriate knowledge
- Reference loaded resources in responses
- Unload resources to save context

### With Commands

Commands can:

- Auto-load referenced resources
- Display resources in step-by-step workflows
- Link to resource content
- Build on resource foundations

### With Checklists

Checklists can:

- Reference step-by-step resources
- Link to validation guides
- Auto-load prerequisite resources
- Track against knowledge base patterns

## See Also

- [Resource Loader Plugin README](./README.md)
- [OpenCode Resource Structure](../docs/frontmatter-schema.md)
- [Plugin Development Guide](../docs/opencode-plugin-development-guide.md)
