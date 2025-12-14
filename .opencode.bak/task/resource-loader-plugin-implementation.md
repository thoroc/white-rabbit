---
title: Resource Loader Plugin Implementation Summary
description: Complete summary of the Resource Loader plugin implementation with features, architecture, and deployment instructions
type: task
category: Development
tags:
    - resource-loader
    - plugin
    - implementation
    - deployment
---

# Resource Loader Plugin - Implementation Summary

## Overview

A comprehensive OpenCode plugin that dynamically loads and unloads resources from `~/.config/opencode/{task,template,knowledge-base,checklist}` into session contexts. The plugin enables agents and commands to access resources on-demand with intelligent caching, auto-referencing, and automatic cleanup.

## What Was Built

### Core Plugin Implementation

**File:** `/Users/thomas.roche/.config/opencode/plugin/resource-loader/index.ts`

**Size:** 16 KB | **Type:** TypeScript | **Status:** ✅ Ready

**Features Implemented:**

1. **Resource Discovery System**
    - Automatic scanning of resource directories
    - YAML frontmatter parsing for metadata extraction
    - Intelligent caching per directory type
    - Support for task, template, knowledge-base, and checklist types

2. **Five Core Tools**
    - `resource_list` - List resources with filtering
    - `resource_search` - Search by query, type, category
    - `resource_load` - Load resource into session
    - `resource_unload` - Remove resource from session
    - `resource_session_info` - View loaded resources

3. **Smart Hooks**
    - `chat.message` - Auto-detect and load referenced resources
    - `event` - Cleanup when sessions end

4. **Session Management**
    - Per-session resource context tracking
    - Automatic cleanup on session deletion
    - Memory-efficient context isolation

### Documentation

1. **Plugin README**
    - File: `plugin/resource-loader/README.md`
    - Complete feature documentation
    - Tool reference with examples
    - Architecture and integration guide
    - Troubleshooting section

2. **Integration Guide**
    - File: `knowledge-base/resource-loader-integration-guide.md`
    - Step-by-step usage examples
    - Workflow patterns
    - Best practices
    - Advanced integration topics

3. **Quick Reference**
    - File: `template/resource-loader-quick-reference.md`
    - Commands at a glance
    - Common patterns
    - Troubleshooting table
    - Performance tips

### Testing

**File:** `plugin/resource-loader/index.test.ts`

**Size:** 4.7 KB | **Type:** TypeScript Test Suite

**Test Coverage:**

- Plugin initialization
- Resource listing with filters
- Resource search functionality
- Resource loading and unloading
- Session info retrieval
- Chat message hook auto-loading
- Event hook session cleanup

## Architecture

### Directory Structure

```
~/.config/opencode/
├── plugin/resource-loader/
│   ├── index.ts (16 KB - Main plugin)
│   ├── index.test.ts (4.7 KB - Tests)
│   └── README.md (8.7 KB - Documentation)
├── knowledge-base/
│   └── resource-loader-integration-guide.md (New)
└── template/
    └── resource-loader-quick-reference.md (New)
```

### Component Design

**Resource Discovery**

- Scans directories: task, template, knowledge-base, checklist
- Caches results per directory
- Parses YAML frontmatter automatically
- O(1) lookups after discovery

**Session Context**

- Map of resource names to metadata
- Per-session isolation
- Created on-demand
- Cleaned up on session end

**Auto-Loading**

- Detects patterns in message content
- Matches: `{type} {resource-name}` or `[name](resource)`
- Loads only if not already loaded
- Logs auto-loads to console

## Key Features

### 1. Automatic Resource Discovery

```typescript
// Scans these directories automatically
~/.config/opencode/task/
~/.config/opencode/template/
~/.config/opencode/knowledge-base/
~/.config/opencode/checklist/
```

### 2. Intelligent Caching

- Results cached per directory type
- Prevents repeated filesystem scans
- O(1) lookup performance
- Cleared on plugin reload

### 3. Smart Auto-Loading

Detects resource references in messages:

- `knowledge-base api-patterns` → auto-loads
- `[deployment-guide](resource)` → auto-loads
- Skips already-loaded resources
- Non-blocking error handling

### 4. Session Isolation

- Each session has independent context
- Resources don't leak between sessions
- Automatic cleanup on deletion
- Memory efficient

### 5. Flexible Search

Search by:

- Query (name, title, description)
- Type (task, template, knowledge-base, checklist)
- Category (Development, Documentation, etc.)
- Tags
- With configurable result limits

## Tools Reference

### resource_list

**Purpose:** List resources by type/category

**Arguments:**

- `type` (optional) - Filter by type
- `category` (optional) - Filter by category
- `limit` (optional) - Max results (default: 50)

**Returns:** Formatted list grouped by type

### resource_search

**Purpose:** Search resources by query

**Arguments:**

- `query` (required) - Search term
- `type` (optional) - Filter by type
- `limit` (optional) - Max results (default: 20)

**Returns:** Matching resources grouped by type

### resource_load

**Purpose:** Load resource into session

**Arguments:**

- `name` (required) - Resource name
- `type` (required) - Resource type

**Returns:** Success message with metadata

### resource_unload

**Purpose:** Remove resource from session

**Arguments:**

- `name` (required) - Resource name

**Returns:** Unload confirmation

### resource_session_info

**Purpose:** View loaded resources

**Arguments:** None

**Returns:** List of loaded resources grouped by type

## Usage Examples

### Example 1: Search and Load

```
Agent: "Find API documentation"
> resource_search(query: 'API', type: 'knowledge-base')
[Returns matching resources]
> resource_load(name: 'api-documentation', type: 'knowledge-base')
[Loads into context]
```

### Example 2: Auto-Loading

```
Command content: "Follow [deployment-strategy](resource)"
[User runs command]
> Plugin detects reference
> Auto-loads deployment-strategy
> Shows in session history
```

### Example 3: Session Management

```
> resource_session_info()
[Shows loaded: api-patterns, deployment-guide]
> resource_unload(name: 'api-patterns')
> resource_session_info()
[Shows loaded: deployment-guide]
```

## Integration Points

### With Agents

Agents can:

- Search for domain knowledge
- Load context-specific resources
- Use in responses
- Unload to save context

### With Commands

Commands can:

- Reference resources with patterns
- Auto-load on execution
- Display in workflow
- Access throughout session

### With Templates

Templates can:

- Specify required resources
- Auto-load via references
- Use in procedures
- Clean up after

## Performance Characteristics

- **Discovery:** O(n) where n = markdown files
- **Search:** O(n) linear scan
- **List:** O(m) where m = filtered results
- **Load:** O(1) after discovery
- **Cache:** O(1) lookup
- **Memory:** Minimal - metadata only

## Deployment Instructions

### 1. Enable the Plugin

Add to `~/.config/opencode/opencode.json`:

```json
{
    "plugin": [
        "file:///Users/thomas.roche/.config/opencode/plugin/resource-loader"
    ]
}
```

### 2. Verify Installation

```bash
# Check files exist
ls -la ~/.config/opencode/plugin/resource-loader/

# Verify TypeScript compiles
deno check ~/.config/opencode/plugin/resource-loader/index.ts
```

### 3. Test in OpenCode

In a session, try:

```
resource_list()
resource_search(query: 'test')
resource_session_info()
```

### 4. Configure Resources

Ensure resources have frontmatter:

```yaml
---
title: Resource Title
description: Description
type: knowledge-base
category: Development
tags: [tag1, tag2]
---
```

## Testing

Run tests with:

```bash
# Using Deno
deno test --allow-read plugin/resource-loader/index.test.ts

# Or manually check
deno check plugin/resource-loader/index.ts
```

## Files Created

| File                                                  | Size   | Purpose                    |
| ----------------------------------------------------- | ------ | -------------------------- |
| `plugin/resource-loader/index.ts`                     | 16 KB  | Main plugin implementation |
| `plugin/resource-loader/index.test.ts`                | 4.7 KB | Test suite                 |
| `plugin/resource-loader/README.md`                    | 8.7 KB | Plugin documentation       |
| `knowledge-base/resource-loader-integration-guide.md` | New    | Integration guide          |
| `template/resource-loader-quick-reference.md`         | New    | Quick reference            |

## TypeScript Compliance

- ✅ Full TypeScript support
- ✅ No `any` types where possible
- ✅ Proper error handling
- ✅ Compiles with `deno check`
- ✅ Compatible with existing plugin ecosystem

## Known Limitations

1. **Search is case-insensitive** - Resource names should be lowercase
2. **Auto-load patterns are basic** - Full regex support possible in future
3. **No remote resources** - Only filesystem resources
4. **Metadata extraction** - Basic YAML parsing
5. **No versioning** - Single version per resource

## Future Enhancements

- [ ] Webhook support for external resources
- [ ] Custom search ranking/scoring
- [ ] Resource relationships and links
- [ ] Export loaded resources to files
- [ ] Resource version control
- [ ] Sync across sessions
- [ ] Resource caching to disk
- [ ] Batch operations

## Troubleshooting

### Resource not found

1. Use `resource_list()` to verify existence
2. Check filename - must be exact
3. Verify file location in correct directory

### Auto-load not working

1. Check message contains pattern: `type name`
2. Verify resource name is exact
3. Use `resource_load()` explicitly

### Performance issues

1. Check discovery time with many files
2. Use `limit` parameter to reduce results
3. Unload unused resources regularly

## Support

For issues or questions:

1. Check `plugin/resource-loader/README.md`
2. Review `knowledge-base/resource-loader-integration-guide.md`
3. Consult `template/resource-loader-quick-reference.md`
4. Review test examples in `index.test.ts`

## Completion Status

✅ **All tasks completed:**

- [x] Resource discovery with caching
- [x] Five core tools implemented
- [x] Auto-loading via chat messages
- [x] Session cleanup on end
- [x] Complete documentation
- [x] Test suite
- [x] Integration guide
- [x] Quick reference
- [x] TypeScript compilation verified
- [x] Ready for production use

## Next Steps

1. **Enable the plugin** in `opencode.json`
2. **Test with** `resource_list()` in a session
3. **Create resources** with proper frontmatter
4. **Integrate with agents** using search/load patterns
5. **Use in commands** with reference patterns

---

**Created:** December 3, 2025
**Plugin Version:** 1.0.0
**TypeScript Version:** 5.x compatible
**Status:** ✅ Production Ready
