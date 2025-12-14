# Dynamic Resource Loader Plugin

An OpenCode plugin that enables dynamic discovery, loading, and context management of project resources (checklists, knowledge-base, schema, task, template).

## Features

- **Dynamic Resource Discovery**: Search and query available resources by type, domain, tags, or text search
- **On-Demand Loading**: Load resource content only when needed to manage context efficiently
- **Automatic Context Management**: Intelligent flagging and pruning of loaded resources
- **Reference Graph**: Track dependencies between resources and automatically load referenced content
- **Persistent Caching**: Fast index rebuilds with persistent cache support
- **Session Tracking**: Per-session resource tracking with lifecycle management

## Installation

This plugin is part of the `.opencode/plugin` directory structure.

```
.opencode/plugin/dynamic-resource-loader/
├── index.ts              # Main plugin entry point
├── types.ts              # TypeScript type definitions
├── utils.ts              # Utility functions
├── indexing.ts           # Resource indexing logic
├── cache.ts              # Cache management
├── session.ts            # Session management
└── __tests__/            # Test files
    ├── utils.test.ts
    └── indexing.test.ts
```

## Usage

### Tool 1: resource-query

Search for available resources.

```typescript
// Find all checklists in the dev domain
{
  "tool": "resource-query",
  "args": {
    "type": "checklist",
    "domain": "dev"
  }
}

// Search by tags
{
  "tool": "resource-query",
  "args": {
    "tags": ["git", "vcs"],
    "limit": 5
  }
}

// Full-text search
{
  "tool": "resource-query",
  "args": {
    "query": "commit",
    "type": "all"
  }
}
```

**Response:**

```json
{
  "query": { ... },
  "results": [
    {
      "id": "git-pre-commit",
      "type": "checklist",
      "name": "Git Pre-Commit Checklist",
      "domain": "dev",
      "description": "Checklist for pre-commit validation",
      "tags": ["git", "vcs"],
      "path": ".opencode/checklist/dev/git-pre-commit.md",
      "size": "2.45 KB"
    }
  ],
  "total": 1,
  "showing": 1,
  "hint": "Use resource-load with an ID to fetch the full content"
}
```

### Tool 2: resource-load

Load the full content of a resource.

```typescript
// Load a single resource
{
  "tool": "resource-load",
  "args": {
    "id": "git-pre-commit"
  }
}

// Load with references
{
  "tool": "resource-load",
  "args": {
    "id": "git-operations-guide",
    "includeReferences": true
  }
}
```

**Response:**

```markdown
# Resource: Git Pre-Commit Checklist

**Type:** checklist
**Domain:** dev
**ID:** git-pre-commit
**Description:** Checklist for pre-commit validation
**Tags:** git, vcs
**Path:** .opencode/checklist/dev/git-pre-commit.md
**Size:** 2.45 KB

---

[Full resource content here]
```

### Tool 3: resource-list-loaded

View currently loaded resources in the session.

```typescript
{
  "tool": "resource-list-loaded",
  "args": {}
}
```

**Response:**

```json
{
    "sessionID": "abc123",
    "loaded": [
        {
            "id": "git-pre-commit",
            "type": "checklist",
            "name": "Git Pre-Commit Checklist",
            "status": "active",
            "loadedAt": "2025-12-12T10:30:00.000Z",
            "loadedInMessage": "msg-001",
            "size": "2.45 KB",
            "includeReferences": false
        }
    ],
    "totalLoaded": 3,
    "currentlyActive": 1,
    "totalSize": "8.12 KB",
    "lastActivity": "2025-12-12T10:32:00.000Z"
}
```

### Tool 4: resource-release

Mark resources as no longer needed for pruning.

```typescript
// Release specific resources
{
  "tool": "resource-release",
  "args": {
    "ids": ["git-pre-commit", "git-post-commit"]
  }
}

// Release all except specific ones
{
  "tool": "resource-release",
  "args": {
    "keep": ["important-resource"]
  }
}

// Release all
{
  "tool": "resource-release",
  "args": {}
}
```

**Response:**

```json
{
    "message": "Released 2 resource(s)",
    "released": ["git-pre-commit", "git-post-commit"],
    "remaining": 1,
    "hint": "Released resources will be pruned from context in the next message cycle"
}
```

## Resource Types

The plugin indexes five types of resources:

1. **checklist** - Step-by-step checklists (`.md`)
2. **knowledge-base** - Documentation and guides (`.md`)
3. **schema** - JSON schemas (`.json`)
4. **task** - Task definitions (`.md`)
5. **template** - File templates (`.md`)

## Domain Convention

Resources are organized by domain following the CLAUDE.md convention:

- **opencode**: OpenCode-related resources (`*/opencode/*`)
- **core**: Core project resources (`*/core/*`)
- **docs**: Documentation resources (`*/docs/*`)
- **dev**: Development resources (`*/dev/*`)
- **common**: Common resources (all others)

## Configuration

Default configuration (can be customized in plugin initialization):

```typescript
{
  autoRebuildIndex: false,          // Auto-rebuild index on file changes
  persistCache: true,               // Save index to disk cache
  autoLoadReferences: false,        // Auto-load referenced resources
  maxReferencesDepth: 2,           // Max depth for reference loading
  autoFlagAfterMessage: true,      // Auto-flag resources after message
  maxResourcesPerSession: 20,      // Max resources per session
  maxTotalSizePerSession: 10485760, // Max total size (10MB)
  indexBuildTimeout: 30000,        // Index build timeout (30s)
  fileReadTimeout: 5000            // File read timeout (5s)
}
```

## Resource Frontmatter

Resources should include frontmatter metadata:

```markdown
---
title: Git Pre-Commit Checklist
description: Checklist to run before committing code
tags: [git, vcs, quality]
domain: dev
category: checklist
version: 1.0.0
references: [git-operations-guide, code-quality-standards]
referencedBy: [git-vcs-specialist]
author: Team
created: 2025-01-01
status: stable
---

# Checklist content here
```

## Inline References

Resources can reference others using:

- `@resource-id` - Simple reference
- `[[resource-id]]` - Wiki-style reference

Example:

```markdown
Before committing, review @git-pre-commit and follow [[code-quality-standards]].
```

## Hooks

The plugin implements three hooks:

### chat.message

- Tracks session activity
- Auto-flags resources from previous messages (when configured)

### tool.execute.after

- Reactivates resources when resource-load is called
- Adds pruning metadata to tool outputs

### event

- Manages session lifecycle (creation/deletion)
- Auto-prunes resources on session idle
- Invalidates cache when resource files are edited

## Testing

Run tests using Bun:

```bash
bun test .opencode/plugin/dynamic-resource-loader/__tests__
```

## Architecture

```
┌─────────────────────────────────────┐
│   Dynamic Resource Loader Plugin     │
├─────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │     Resource Index Cache       │ │
│  │  • Metadata Map                 │ │
│  │  • Reference Graph              │ │
│  │  • Domain/Tag Indexes           │ │
│  └────────┬───────────────────────┘ │
│           │                          │
│           ▼                          │
│  ┌────────────────────────────────┐ │
│  │        Tool Registry           │ │
│  │  • resource-query               │ │
│  │  • resource-load                │ │
│  │  • resource-list-loaded         │ │
│  │  • resource-release             │ │
│  └────────┬───────────────────────┘ │
│           │                          │
│           ▼                          │
│  ┌────────────────────────────────┐ │
│  │     Lifecycle Tracker          │ │
│  │  • Session State Map            │ │
│  │  • Loaded Resource Tracking     │ │
│  │  • Pruning Queue                │ │
│  └────────────────────────────────┘ │
│                                      │
└─────────────────────────────────────┘
```

## Performance

- **Lazy Index Building**: Index is built only on first query
- **Persistent Caching**: Index cached to disk for fast restarts
- **Efficient Lookups**: Secondary indexes for O(1) type/domain/tag queries
- **Memory Management**: Automatic session cleanup after 24 hours
- **Size Limits**: Per-resource and per-session size limits

## Troubleshooting

### Index not building

- Check that `.opencode/` directories exist
- Verify file permissions
- Check console for error messages

### Resources not found

- Ensure frontmatter is valid YAML
- Check that files are in correct directories
- Verify domain path conventions

### Cache issues

- Delete cache file: `.opencode/.cache/resource-index.json`
- Plugin will rebuild index on next query

## Contributing

When adding new resources:

1. Place in appropriate type directory (`.opencode/{type}/`)
2. Follow domain path convention (`*/{domain}/*`)
3. Include proper frontmatter metadata
4. Test with `resource-query` to verify indexing

## License

Part of the OpenCode plugin ecosystem.
