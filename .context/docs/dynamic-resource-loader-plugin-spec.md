---
title: 'Dynamic Resource Loader Plugin - Implementation Specification'
description: 'Complete implementation specification for the OpenCode dynamic resource loading plugin'
type: specification
category: opencode
version: 1.0.0
created: 2025-12-12
status: draft
---

# Dynamic Resource Loader Plugin - Implementation Specification

## Executive Summary

This specification defines a comprehensive OpenCode plugin that enables dynamic discovery, loading, and context management of project resources (checklists, knowledge-base, schema, task, template). The plugin provides tools for AI agents to query and load resources on-demand, while automatically managing context lifecycle to prevent token bloat.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Data Structures](#data-structures)
3. [Resource Indexing](#resource-indexing)
4. [Tool Implementations](#tool-implementations)
5. [Hook Implementations](#hook-implementations)
6. [Context Management](#context-management)
7. [Error Handling](#error-handling)
8. [Testing Strategy](#testing-strategy)
9. [Performance Optimization](#performance-optimization)
10. [Code Templates](#code-templates)

---

## System Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenCode Plugin System                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Dynamic Resource Loader Plugin                 │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │                                                         │  │
│  │  ┌─────────────────┐      ┌─────────────────────┐    │  │
│  │  │  Resource Index  │◄────►│  Reference Graph    │    │  │
│  │  │    Builder       │      │     Builder         │    │  │
│  │  └────────┬─────────┘      └─────────────────────┘    │  │
│  │           │                                             │  │
│  │           ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          Resource Index Cache                    │  │  │
│  │  │  • Metadata Map                                  │  │  │
│  │  │  • Reference Graph                               │  │  │
│  │  │  • Domain/Tag Indexes                            │  │  │
│  │  └────────┬─────────────────────────────────────────┘  │  │
│  │           │                                             │  │
│  │           ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              Tool Registry                       │  │  │
│  │  │  • resource-query                                │  │  │
│  │  │  • resource-load                                 │  │  │
│  │  │  • resource-list-loaded                          │  │  │
│  │  │  • resource-release                              │  │  │
│  │  └────────┬─────────────────────────────────────────┘  │  │
│  │           │                                             │  │
│  │           ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Lifecycle Tracker                        │  │  │
│  │  │  • Session State Map                             │  │  │
│  │  │  • Loaded Resource Tracking                      │  │  │
│  │  │  • Pruning Queue                                 │  │  │
│  │  └────────┬─────────────────────────────────────────┘  │  │
│  │           │                                             │  │
│  │           ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │            Hook Handlers                         │  │  │
│  │  │  • chat.message                                  │  │  │
│  │  │  • tool.execute.after                            │  │  │
│  │  │  • event                                         │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  └───────────┬─────────────────────────────────────────────┘  │
│              │                                               │
│              ▼                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           OpenCode SDK Client                          │  │
│  │  • client.find.files()                                 │  │
│  │  • client.file.read()                                  │  │
│  │  • client.event.subscribe()                            │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Data Flow

```
1. Plugin Initialization
   ├─> Register tools
   ├─> Initialize empty index
   └─> Setup hook handlers

2. First Query (resource-query)
   ├─> Check if index exists
   ├─> If not, build index
   │   ├─> Scan .opencode directories
   │   ├─> Parse frontmatter
   │   ├─> Build reference graph
   │   └─> Cache index
   └─> Return filtered results

3. Resource Loading (resource-load)
   ├─> Validate resource ID
   ├─> Read file content
   ├─> Track in lifecycle tracker
   ├─> Optionally load references
   └─> Return formatted content

4. Context Management
   ├─> tool.execute.after: Mark resource as active
   ├─> chat.message: Flag resources for pruning
   └─> event (session.idle): Cleanup session state

5. Explicit Release (resource-release)
   ├─> Mark resources as pruned
   ├─> Update lifecycle tracker
   └─> Return confirmation
```

---

## Data Structures

### 1. ResourceMetadata

**Purpose**: Store essential metadata for each resource file.

```typescript
interface ResourceMetadata {
    // Identity
    id: string; // Unique identifier (from frontmatter or derived)
    type: ResourceType; // Resource category

    // File information
    path: string; // Absolute path
    relativePath: string; // Relative to project root
    name: string; // Display name

    // Classification
    domain: Domain; // opencode, core, docs, dev, common
    category?: string; // Sub-category within domain

    // Metadata
    tags?: string[]; // Search tags
    description?: string; // Short description
    version?: string; // Resource version

    // References
    references?: string[]; // IDs of referenced resources
    referencedBy?: string[]; // Agent/command names that reference this

    // File attributes
    size: number; // File size in bytes
    lastModified: number; // Unix timestamp

    // Optional fields
    author?: string;
    created?: string;
    updated?: string;
    difficulty?: string;
    status?: string;
}

type ResourceType =
    | 'checklist'
    | 'knowledge-base'
    | 'schema'
    | 'task'
    | 'template';
type Domain = 'opencode' | 'core' | 'docs' | 'dev' | 'common';
```

### 2. ResourceIndex

**Purpose**: In-memory cache of all indexed resources.

```typescript
interface ResourceIndex {
    version: string; // Index schema version
    generatedAt: number; // Unix timestamp
    projectRoot: string; // Project root path

    // Primary storage
    resources: Map<string, ResourceMetadata>;

    // Secondary indexes for fast lookups
    byType: Map<ResourceType, Set<string>>; // type -> resource IDs
    byDomain: Map<Domain, Set<string>>; // domain -> resource IDs
    byTag: Map<string, Set<string>>; // tag -> resource IDs
    byReference: Map<string, Set<string>>; // agent/command -> resource IDs

    // Reference graph
    graph: ReferenceGraph;
}

interface ReferenceGraph {
    // Forward references: resource -> resources it references
    forward: Map<string, Set<string>>;

    // Backward references: resource -> resources that reference it
    backward: Map<string, Set<string>>;

    // Agent/command references: name -> resource IDs
    agents: Map<string, Set<string>>;
    commands: Map<string, Set<string>>;
}
```

### 3. SessionResourceState

**Purpose**: Track resource lifecycle within a session.

```typescript
interface SessionResourceState {
    sessionID: string;

    // Loaded resources
    loaded: Map<string, LoadedResource>;

    // Statistics
    totalLoaded: number;
    totalSize: number; // Cumulative size in bytes

    // Timestamps
    createdAt: number;
    lastActivity: number;
}

interface LoadedResource {
    id: string;
    type: ResourceType;
    path: string;

    // Tracking
    loadedAt: number; // Unix timestamp
    loadedInMessage: string; // Message ID
    toolCallID: string; // Tool call that loaded it

    // Lifecycle
    status: ResourceStatus;
    flaggedAt?: number; // When flagged for pruning
    prunedAt?: number; // When actually pruned

    // Metadata
    size: number;
    includeReferences: boolean; // Whether references were auto-loaded
}

type ResourceStatus = 'active' | 'flagged' | 'released' | 'pruned';
```

### 4. PluginState

**Purpose**: Global plugin state.

```typescript
interface PluginState {
    // Index
    index: ResourceIndex | null;
    indexBuilding: Promise<ResourceIndex> | null; // Prevent concurrent builds

    // Session tracking
    sessions: Map<string, SessionResourceState>;

    // Configuration
    config: PluginConfig;

    // Statistics
    stats: PluginStats;
}

interface PluginConfig {
    // Index behavior
    autoRebuildIndex: boolean;
    indexCachePath: string;
    persistCache: boolean;

    // Loading behavior
    autoLoadReferences: boolean;
    maxReferencesDepth: number;

    // Context management
    autoFlagAfterMessage: boolean;
    maxResourcesPerSession: number;
    maxTotalSizePerSession: number; // bytes

    // Performance
    indexBuildTimeout: number; // ms
    fileReadTimeout: number; // ms
}

interface PluginStats {
    indexBuilds: number;
    totalQueries: number;
    totalLoads: number;
    totalReleases: number;
    cacheHits: number;
    cacheMisses: number;
}
```

---

## Resource Indexing

### Index Building Algorithm

```typescript
async function buildResourceIndex(
    client: OpencodeClient,
    worktree: string,
    $: BunShell
): Promise<ResourceIndex> {
    const index: ResourceIndex = {
        version: '1.0.0',
        generatedAt: Date.now(),
        projectRoot: worktree,
        resources: new Map(),
        byType: new Map(),
        byDomain: new Map(),
        byTag: new Map(),
        byReference: new Map(),
        graph: {
            forward: new Map(),
            backward: new Map(),
            agents: new Map(),
            commands: new Map(),
        },
    };

    // Define resource paths
    const resourcePaths: Array<[ResourceType, string]> = [
        ['checklist', '.opencode/checklist'],
        ['knowledge-base', '.opencode/knowledge-base'],
        ['schema', '.opencode/schema'],
        ['task', '.opencode/task'],
        ['template', '.opencode/template'],
    ];

    // Scan each resource type
    for (const [type, basePath] of resourcePaths) {
        const pattern = type === 'schema' ? '**/*.json' : '**/*.md';

        try {
            // Find all files of this type
            const result = await client.find.files({
                body: {
                    pattern: `${basePath}/${pattern}`,
                    directory: worktree,
                },
            });

            if (result.error) {
                console.warn(
                    `[ResourceIndex] Error finding ${type} files:`,
                    result.error
                );
                continue;
            }

            // Process each file
            for (const filePath of result.data.files) {
                try {
                    const metadata = await extractResourceMetadata(
                        client,
                        filePath,
                        type,
                        worktree
                    );

                    if (metadata) {
                        addResourceToIndex(index, metadata);
                    }
                } catch (error) {
                    console.warn(
                        `[ResourceIndex] Error processing ${filePath}:`,
                        error
                    );
                }
            }
        } catch (error) {
            console.error(`[ResourceIndex] Error scanning ${type}:`, error);
        }
    }

    // Build reference graph
    buildReferenceGraph(index);

    // Index agent and command references
    await indexAgentCommandReferences(client, worktree, index);

    return index;
}
```

### Metadata Extraction

```typescript
async function extractResourceMetadata(
    client: OpencodeClient,
    filePath: string,
    type: ResourceType,
    projectRoot: string
): Promise<ResourceMetadata | null> {
    try {
        // Read file content
        const result = await client.file.read({
            body: { path: filePath },
        });

        if (result.error) {
            return null;
        }

        const content = result.data.content;

        // Parse frontmatter
        const frontmatter = parseFrontmatter(content);

        // Derive domain from path
        const domain = deriveDomainFromPath(filePath);

        // Extract ID (from frontmatter or filename)
        const id = frontmatter.id || deriveIdFromPath(filePath);

        // Get file stats
        const stats = await getFileStats($, filePath);

        return {
            id,
            type,
            path: filePath,
            relativePath: filePath.replace(projectRoot + '/', ''),
            name:
                frontmatter.title ||
                frontmatter.name ||
                deriveNameFromPath(filePath),
            domain,
            category: frontmatter.category,
            tags: frontmatter.tags || [],
            description: frontmatter.description,
            version: frontmatter.version,
            references:
                frontmatter.references || extractInlineReferences(content),
            referencedBy: frontmatter.referencedBy || [],
            size: stats.size,
            lastModified: stats.mtime,
            author: frontmatter.author,
            created: frontmatter.created,
            updated: frontmatter.updated,
            difficulty: frontmatter.difficulty,
            status: frontmatter.status,
        };
    } catch (error) {
        console.error(
            `[ResourceIndex] Error extracting metadata from ${filePath}:`,
            error
        );
        return null;
    }
}
```

### Frontmatter Parsing

```typescript
function parseFrontmatter(content: string): Record<string, any> {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return {};
    }

    try {
        // Simple YAML parser for frontmatter
        const yaml = match[1];
        const lines = yaml.split('\n');
        const result: Record<string, any> = {};

        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Handle arrays [item1, item2]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value
                    .slice(1, -1)
                    .split(',')
                    .map((v) => v.trim().replace(/^['"]|['"]$/g, ''));
            }
            // Handle quoted strings
            else if (
                (value.startsWith("'") && value.endsWith("'")) ||
                (value.startsWith('"') && value.endsWith('"'))
            ) {
                value = value.slice(1, -1);
            }
            // Handle booleans
            else if (value === 'true') {
                value = true;
            } else if (value === 'false') {
                value = false;
            }
            // Handle numbers
            else if (!isNaN(Number(value))) {
                value = Number(value);
            }

            result[key] = value;
        }

        return result;
    } catch (error) {
        console.warn('[ResourceIndex] Error parsing frontmatter:', error);
        return {};
    }
}
```

### Domain Derivation

```typescript
function deriveDomainFromPath(filePath: string): Domain {
    // Domain path convention from CLAUDE.md
    if (filePath.includes('/opencode/')) return 'opencode';
    if (filePath.includes('/core/')) return 'core';
    if (filePath.includes('/docs/')) return 'docs';
    if (filePath.includes('/dev/')) return 'dev';
    return 'common';
}
```

### Reference Graph Building

```typescript
function buildReferenceGraph(index: ResourceIndex): void {
    // Build forward and backward reference graphs
    for (const [id, metadata] of index.resources) {
        if (metadata.references && metadata.references.length > 0) {
            // Initialize forward references
            if (!index.graph.forward.has(id)) {
                index.graph.forward.set(id, new Set());
            }

            for (const refId of metadata.references) {
                // Add to forward graph
                index.graph.forward.get(id)!.add(refId);

                // Add to backward graph
                if (!index.graph.backward.has(refId)) {
                    index.graph.backward.set(refId, new Set());
                }
                index.graph.backward.get(refId)!.add(id);
            }
        }
    }
}
```

### Indexing Helpers

```typescript
function addResourceToIndex(
    index: ResourceIndex,
    metadata: ResourceMetadata
): void {
    const { id, type, domain, tags, referencedBy } = metadata;

    // Add to primary storage
    index.resources.set(id, metadata);

    // Add to type index
    if (!index.byType.has(type)) {
        index.byType.set(type, new Set());
    }
    index.byType.get(type)!.add(id);

    // Add to domain index
    if (!index.byDomain.has(domain)) {
        index.byDomain.set(domain, new Set());
    }
    index.byDomain.get(domain)!.add(id);

    // Add to tag indexes
    if (tags) {
        for (const tag of tags) {
            if (!index.byTag.has(tag)) {
                index.byTag.set(tag, new Set());
            }
            index.byTag.get(tag)!.add(id);
        }
    }

    // Add to reference indexes
    if (referencedBy) {
        for (const ref of referencedBy) {
            if (!index.byReference.has(ref)) {
                index.byReference.set(ref, new Set());
            }
            index.byReference.get(ref)!.add(id);
        }
    }
}
```

---

## Tool Implementations

### Tool 1: resource-query

**Purpose**: Search and discover available resources.

```typescript
const resourceQueryTool = tool({
    description:
        'Search for available resources (checklists, knowledge-base, schemas, tasks, templates) by type, name, tags, domain, or references. Use this to discover what resources are available before loading them.',
    args: {
        type: tool.schema
            .enum([
                'checklist',
                'knowledge-base',
                'schema',
                'task',
                'template',
                'all',
            ])
            .optional()
            .describe('Filter by resource type'),

        query: tool.schema
            .string()
            .optional()
            .describe(
                'Search term to match against name, description, or tags'
            ),

        domain: tool.schema
            .enum(['opencode', 'core', 'docs', 'dev', 'common'])
            .optional()
            .describe('Filter by domain'),

        tags: tool.schema
            .array(tool.schema.string())
            .optional()
            .describe('Filter by tags (AND logic - all tags must match)'),

        referencedBy: tool.schema
            .string()
            .optional()
            .describe(
                'Filter by agent or command name that references the resource'
            ),

        limit: tool.schema
            .number()
            .min(1)
            .max(50)
            .default(10)
            .describe('Maximum number of results to return'),
    },

    async execute(args, context) {
        try {
            // Ensure index is built
            const index = await ensureIndex();

            // Start with all resources
            let candidateIds = new Set(index.resources.keys());

            // Apply filters
            if (args.type && args.type !== 'all') {
                const typeIds = index.byType.get(args.type as ResourceType);
                if (typeIds) {
                    candidateIds = intersection(candidateIds, typeIds);
                } else {
                    candidateIds.clear();
                }
            }

            if (args.domain) {
                const domainIds = index.byDomain.get(args.domain as Domain);
                if (domainIds) {
                    candidateIds = intersection(candidateIds, domainIds);
                } else {
                    candidateIds.clear();
                }
            }

            if (args.tags && args.tags.length > 0) {
                for (const tag of args.tags) {
                    const tagIds = index.byTag.get(tag);
                    if (tagIds) {
                        candidateIds = intersection(candidateIds, tagIds);
                    } else {
                        candidateIds.clear();
                        break;
                    }
                }
            }

            if (args.referencedBy) {
                const refIds = index.byReference.get(args.referencedBy);
                if (refIds) {
                    candidateIds = intersection(candidateIds, refIds);
                } else {
                    candidateIds.clear();
                }
            }

            // Apply text search
            let results: ResourceMetadata[] = [];
            for (const id of candidateIds) {
                const metadata = index.resources.get(id);
                if (!metadata) continue;

                if (args.query) {
                    const query = args.query.toLowerCase();
                    const searchText = [
                        metadata.name,
                        metadata.description || '',
                        ...(metadata.tags || []),
                    ]
                        .join(' ')
                        .toLowerCase();

                    if (searchText.includes(query)) {
                        results.push(metadata);
                    }
                } else {
                    results.push(metadata);
                }
            }

            // Sort by relevance (simple: by name)
            results.sort((a, b) => a.name.localeCompare(b.name));

            // Limit results
            const limited = results.slice(0, args.limit);

            // Update stats
            state.stats.totalQueries++;

            // Format output
            return JSON.stringify(
                {
                    query: args,
                    results: limited.map((m) => ({
                        id: m.id,
                        type: m.type,
                        name: m.name,
                        domain: m.domain,
                        description: m.description,
                        tags: m.tags,
                        path: m.relativePath,
                        size: formatBytes(m.size),
                    })),
                    total: results.length,
                    showing: limited.length,
                    hint: 'Use resource-load with an ID to fetch the full content',
                },
                null,
                2
            );
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'QueryError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
```

### Tool 2: resource-load

**Purpose**: Load specific resource content into context.

```typescript
const resourceLoadTool = tool({
    description:
        'Load the full content of a specific resource by ID. This adds the resource to the active context for the current session. Use resource-query first to find available resources.',
    args: {
        id: tool.schema
            .string()
            .describe('Resource ID (from resource-query results)'),

        includeReferences: tool.schema
            .boolean()
            .default(false)
            .describe(
                'Automatically load resources that this resource references'
            ),
    },

    async execute(args, context) {
        try {
            // Ensure index is built
            const index = await ensureIndex();

            // Validate resource exists
            const metadata = index.resources.get(args.id);
            if (!metadata) {
                return JSON.stringify(
                    {
                        error: 'ResourceNotFound',
                        message: `Resource with ID '${args.id}' does not exist`,
                        suggestion:
                            'Use resource-query to find available resources',
                    },
                    null,
                    2
                );
            }

            // Check session limits
            const sessionState = getOrCreateSessionState(context.sessionID);
            if (sessionState.loaded.has(args.id)) {
                return JSON.stringify(
                    {
                        warning: 'AlreadyLoaded',
                        message: `Resource '${args.id}' is already loaded in this session`,
                        loadedAt: sessionState.loaded.get(args.id)!.loadedAt,
                    },
                    null,
                    2
                );
            }

            if (
                sessionState.loaded.size >= state.config.maxResourcesPerSession
            ) {
                return JSON.stringify(
                    {
                        error: 'SessionLimitReached',
                        message: `Maximum of ${state.config.maxResourcesPerSession} resources per session`,
                        suggestion: 'Use resource-release to free up space',
                    },
                    null,
                    2
                );
            }

            // Read file content
            const fileResult = await client.file.read({
                body: { path: metadata.path },
            });

            if (fileResult.error) {
                return JSON.stringify(
                    {
                        error: 'FileReadError',
                        message: `Failed to read resource file: ${fileResult.error}`,
                        path: metadata.path,
                    },
                    null,
                    2
                );
            }

            const content = fileResult.data.content;

            // Track loaded resource
            const loadedResource: LoadedResource = {
                id: args.id,
                type: metadata.type,
                path: metadata.path,
                loadedAt: Date.now(),
                loadedInMessage: context.messageID,
                toolCallID: context.sessionID, // Use sessionID as proxy for callID
                status: 'active',
                size: metadata.size,
                includeReferences: args.includeReferences,
            };

            sessionState.loaded.set(args.id, loadedResource);
            sessionState.totalLoaded++;
            sessionState.totalSize += metadata.size;
            sessionState.lastActivity = Date.now();

            // Update stats
            state.stats.totalLoads++;

            // Load references if requested
            let referencedContent = '';
            if (
                args.includeReferences &&
                metadata.references &&
                metadata.references.length > 0
            ) {
                const refResults = await loadReferences(
                    metadata.references,
                    context,
                    1,
                    state.config.maxReferencesDepth
                );
                if (refResults.length > 0) {
                    referencedContent =
                        '\n\n---\n\n# Referenced Resources\n\n' +
                        refResults.join('\n\n---\n\n');
                }
            }

            // Format output
            const output = [
                `# Resource: ${metadata.name}`,
                `**Type:** ${metadata.type}`,
                `**Domain:** ${metadata.domain}`,
                `**ID:** ${metadata.id}`,
                metadata.description
                    ? `**Description:** ${metadata.description}`
                    : '',
                metadata.tags && metadata.tags.length > 0
                    ? `**Tags:** ${metadata.tags.join(', ')}`
                    : '',
                metadata.version ? `**Version:** ${metadata.version}` : '',
                `**Path:** ${metadata.relativePath}`,
                `**Size:** ${formatBytes(metadata.size)}`,
                '',
                '---',
                '',
                content,
                referencedContent,
            ]
                .filter(Boolean)
                .join('\n');

            return output;
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'LoadError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
```

### Tool 3: resource-list-loaded

**Purpose**: Show currently loaded resources.

```typescript
const resourceListLoadedTool = tool({
    description:
        'List all resources currently loaded in this session context, including their status and metadata',
    args: {},

    async execute(args, context) {
        try {
            const sessionState = state.sessions.get(context.sessionID);

            if (!sessionState || sessionState.loaded.size === 0) {
                return JSON.stringify(
                    {
                        message: 'No resources loaded in this session',
                        loaded: [],
                        totalSize: '0 B',
                    },
                    null,
                    2
                );
            }

            const index = await ensureIndex();

            const loadedList = Array.from(sessionState.loaded.values()).map(
                (lr) => {
                    const metadata = index.resources.get(lr.id);
                    return {
                        id: lr.id,
                        type: lr.type,
                        name: metadata?.name || 'Unknown',
                        status: lr.status,
                        loadedAt: new Date(lr.loadedAt).toISOString(),
                        loadedInMessage: lr.loadedInMessage,
                        size: formatBytes(lr.size),
                        includeReferences: lr.includeReferences,
                        flaggedAt: lr.flaggedAt
                            ? new Date(lr.flaggedAt).toISOString()
                            : undefined,
                    };
                }
            );

            return JSON.stringify(
                {
                    sessionID: context.sessionID,
                    loaded: loadedList,
                    totalLoaded: sessionState.totalLoaded,
                    currentlyActive: sessionState.loaded.size,
                    totalSize: formatBytes(sessionState.totalSize),
                    lastActivity: new Date(
                        sessionState.lastActivity
                    ).toISOString(),
                },
                null,
                2
            );
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'ListError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
```

### Tool 4: resource-release

**Purpose**: Mark resources for pruning.

```typescript
const resourceReleaseTool = tool({
    description:
        'Mark loaded resources as no longer needed, allowing them to be pruned from context. If no IDs specified, releases all resources. Use "keep" to specify resources to retain.',
    args: {
        ids: tool.schema
            .array(tool.schema.string())
            .optional()
            .describe('Resource IDs to release (empty = release all)'),

        keep: tool.schema
            .array(tool.schema.string())
            .optional()
            .describe(
                'Resource IDs to keep (used with empty ids to release all except these)'
            ),
    },

    async execute(args, context) {
        try {
            const sessionState = state.sessions.get(context.sessionID);

            if (!sessionState || sessionState.loaded.size === 0) {
                return JSON.stringify(
                    {
                        message: 'No resources to release',
                        released: [],
                    },
                    null,
                    2
                );
            }

            // Determine which resources to release
            let toRelease: string[] = [];

            if (!args.ids || args.ids.length === 0) {
                // Release all (except "keep" list)
                toRelease = Array.from(sessionState.loaded.keys());
                if (args.keep && args.keep.length > 0) {
                    toRelease = toRelease.filter(
                        (id) => !args.keep!.includes(id)
                    );
                }
            } else {
                // Release specified IDs
                toRelease = args.ids;
            }

            const released: string[] = [];
            const notFound: string[] = [];

            for (const id of toRelease) {
                const loadedResource = sessionState.loaded.get(id);
                if (loadedResource) {
                    // Mark as released
                    loadedResource.status = 'released';
                    loadedResource.flaggedAt = Date.now();
                    released.push(id);
                } else {
                    notFound.push(id);
                }
            }

            // Update stats
            state.stats.totalReleases += released.length;

            return JSON.stringify(
                {
                    message: `Released ${released.length} resource(s)`,
                    released,
                    notFound: notFound.length > 0 ? notFound : undefined,
                    remaining: sessionState.loaded.size - released.length,
                    hint: 'Released resources will be pruned from context in the next message cycle',
                },
                null,
                2
            );
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'ReleaseError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
```

---

## Hook Implementations

### Hook: chat.message

**Purpose**: Track message lifecycle and flag resources for pruning.

```typescript
async function chatMessageHook(
    input: {
        sessionID: string;
        agent?: string;
        model?: { providerID: string; modelID: string };
        messageID?: string;
    },
    output: {
        message: UserMessage;
        parts: Part[];
    }
): Promise<void> {
    try {
        // Get or create session state
        const sessionState = getOrCreateSessionState(input.sessionID);
        sessionState.lastActivity = Date.now();

        // Auto-flag resources if configured
        if (state.config.autoFlagAfterMessage) {
            for (const [id, resource] of sessionState.loaded) {
                if (
                    resource.status === 'active' &&
                    resource.loadedInMessage !== input.messageID
                ) {
                    // Flag resources that were loaded in previous messages
                    resource.status = 'flagged';
                    resource.flaggedAt = Date.now();
                }
            }
        }
    } catch (error) {
        console.error('[ResourceLoader] Error in chat.message hook:', error);
    }
}
```

### Hook: tool.execute.after

**Purpose**: Track tool execution and manage resource lifecycle.

```typescript
async function toolExecuteAfterHook(
    input: {
        tool: string;
        sessionID: string;
        callID: string;
    },
    output: {
        title: string;
        output: string;
        metadata: any;
    }
): Promise<void> {
    try {
        // Track resource-load tool executions
        if (input.tool === 'resource-load') {
            const sessionState = state.sessions.get(input.sessionID);
            if (sessionState) {
                // Mark all resources in this session as active
                for (const [id, resource] of sessionState.loaded) {
                    if (resource.status === 'flagged') {
                        resource.status = 'active';
                        resource.flaggedAt = undefined;
                    }
                }
            }
        }

        // Add pruning hint to metadata
        if (input.tool === 'resource-load') {
            output.metadata = {
                ...output.metadata,
                prunable: true,
                retentionPolicy: 'single-use',
            };
        }
    } catch (error) {
        console.error(
            '[ResourceLoader] Error in tool.execute.after hook:',
            error
        );
    }
}
```

### Hook: event

**Purpose**: React to system events for lifecycle management.

```typescript
async function eventHook(input: { event: Event }): Promise<void> {
    try {
        const event = input.event;

        switch (event.type) {
            case 'session.created':
                // Initialize session state
                if ('sessionID' in event.properties) {
                    getOrCreateSessionState(
                        event.properties.sessionID as string
                    );
                }
                break;

            case 'session.deleted':
                // Cleanup session state
                if ('sessionID' in event.properties) {
                    const sessionID = event.properties.sessionID as string;
                    state.sessions.delete(sessionID);
                }
                break;

            case 'session.idle':
                // Auto-prune flagged resources when session goes idle
                if ('sessionID' in event.properties) {
                    const sessionID = event.properties.sessionID as string;
                    await autoPruneResources(sessionID);
                }
                break;

            case 'file.edited':
                // Invalidate index cache for edited resource files
                if ('path' in event.properties) {
                    const path = event.properties.path as string;
                    if (isResourcePath(path)) {
                        invalidateIndexCache();
                    }
                }
                break;
        }
    } catch (error) {
        console.error('[ResourceLoader] Error in event hook:', error);
    }
}
```

---

## Context Management

### Resource Lifecycle States

```
active → flagged → released → pruned
  ↑                             ↓
  └─────────────────────────────┘
       (re-activated)
```

### Pruning Logic

```typescript
async function autoPruneResources(sessionID: string): Promise<void> {
    const sessionState = state.sessions.get(sessionID);
    if (!sessionState) return;

    const toPrune: string[] = [];

    for (const [id, resource] of sessionState.loaded) {
        // Prune resources that have been flagged or released
        if (resource.status === 'flagged' || resource.status === 'released') {
            resource.status = 'pruned';
            resource.prunedAt = Date.now();
            toPrune.push(id);
        }
    }

    // Remove pruned resources from active tracking
    for (const id of toPrune) {
        sessionState.loaded.delete(id);
    }

    console.log(
        `[ResourceLoader] Auto-pruned ${toPrune.length} resources from session ${sessionID}`
    );
}
```

---

## Error Handling

### Error Types

```typescript
type ResourceError =
    | { type: 'ResourceNotFound'; id: string }
    | { type: 'FileReadError'; path: string; error: string }
    | { type: 'IndexBuildError'; error: string }
    | { type: 'SessionLimitReached'; limit: number }
    | { type: 'InvalidReference'; reference: string }
    | { type: 'QueryError'; message: string };

function formatError(error: ResourceError): string {
    switch (error.type) {
        case 'ResourceNotFound':
            return JSON.stringify(
                {
                    error: 'ResourceNotFound',
                    message: `Resource '${error.id}' does not exist`,
                    suggestion:
                        'Use resource-query to find available resources',
                },
                null,
                2
            );

        case 'FileReadError':
            return JSON.stringify(
                {
                    error: 'FileReadError',
                    path: error.path,
                    message: error.error,
                },
                null,
                2
            );

        case 'IndexBuildError':
            return JSON.stringify(
                {
                    error: 'IndexBuildError',
                    message: error.error,
                    suggestion:
                        'Check .opencode directory structure and file permissions',
                },
                null,
                2
            );

        case 'SessionLimitReached':
            return JSON.stringify(
                {
                    error: 'SessionLimitReached',
                    message: `Maximum of ${error.limit} resources per session`,
                    suggestion: 'Use resource-release to free up space',
                },
                null,
                2
            );

        default:
            return JSON.stringify(
                { error: 'Unknown', message: 'An unknown error occurred' },
                null,
                2
            );
    }
}
```

---

## Testing Strategy

### Unit Tests

```typescript
// Test index building
describe('buildResourceIndex', () => {
    it('should index all resource types', async () => {
        const index = await buildResourceIndex(
            mockClient,
            '/project',
            mockShell
        );
        expect(index.resources.size).toBeGreaterThan(0);
        expect(index.byType.size).toBe(5); // 5 resource types
    });

    it('should handle missing directories gracefully', async () => {
        const index = await buildResourceIndex(mockClient, '/empty', mockShell);
        expect(index.resources.size).toBe(0);
    });
});

// Test metadata extraction
describe('extractResourceMetadata', () => {
    it('should parse frontmatter correctly', async () => {
        const metadata = await extractResourceMetadata(
            mockClient,
            '/path/to/resource.md',
            'knowledge-base',
            '/project'
        );
        expect(metadata?.id).toBe('expected-id');
        expect(metadata?.domain).toBe('dev');
    });
});

// Test tools
describe('resource-query tool', () => {
    it('should filter by type', async () => {
        const result = await resourceQueryTool.execute(
            { type: 'checklist', limit: 10 },
            mockContext
        );
        const parsed = JSON.parse(result);
        expect(parsed.results.every((r) => r.type === 'checklist')).toBe(true);
    });

    it('should apply tag filters with AND logic', async () => {
        const result = await resourceQueryTool.execute(
            { tags: ['git', 'vcs'], limit: 10 },
            mockContext
        );
        const parsed = JSON.parse(result);
        expect(
            parsed.results.every(
                (r) => r.tags.includes('git') && r.tags.includes('vcs')
            )
        ).toBe(true);
    });
});
```

### Integration Tests

```typescript
describe('Resource Loading Flow', () => {
    it('should complete full load/query/release cycle', async () => {
        // 1. Query resources
        const queryResult = await resourceQueryTool.execute(
            { type: 'knowledge-base', limit: 1 },
            mockContext
        );
        const query = JSON.parse(queryResult);
        const resourceId = query.results[0].id;

        // 2. Load resource
        const loadResult = await resourceLoadTool.execute(
            { id: resourceId, includeReferences: false },
            mockContext
        );
        expect(loadResult).toContain('# Resource:');

        // 3. Check loaded
        const listResult = await resourceListLoadedTool.execute(
            {},
            mockContext
        );
        const list = JSON.parse(listResult);
        expect(list.loaded.length).toBe(1);

        // 4. Release resource
        const releaseResult = await resourceReleaseTool.execute(
            { ids: [resourceId] },
            mockContext
        );
        const release = JSON.parse(releaseResult);
        expect(release.released).toContain(resourceId);
    });
});
```

---

## Performance Optimization

### Caching Strategy

```typescript
// Persist index to disk
async function saveIndexCache(index: ResourceIndex): Promise<void> {
    if (!state.config.persistCache) return;

    try {
        const cachePath = state.config.indexCachePath;
        const serialized = serializeIndex(index);
        await Bun.write(cachePath, JSON.stringify(serialized, null, 2));
        console.log('[ResourceLoader] Index cache saved');
    } catch (error) {
        console.warn('[ResourceLoader] Failed to save index cache:', error);
    }
}

// Load index from cache
async function loadIndexCache(): Promise<ResourceIndex | null> {
    if (!state.config.persistCache) return null;

    try {
        const cachePath = state.config.indexCachePath;
        const file = Bun.file(cachePath);
        if (!(await file.exists())) return null;

        const content = await file.text();
        const serialized = JSON.parse(content);
        return deserializeIndex(serialized);
    } catch (error) {
        console.warn('[ResourceLoader] Failed to load index cache:', error);
        return null;
    }
}
```

### Lazy Initialization

```typescript
async function ensureIndex(): Promise<ResourceIndex> {
    // Return cached index if available
    if (state.index) {
        state.stats.cacheHits++;
        return state.index;
    }

    // Wait if index is currently building
    if (state.indexBuilding) {
        return await state.indexBuilding;
    }

    // Start building index
    state.stats.cacheMisses++;
    state.indexBuilding = (async () => {
        try {
            // Try loading from cache first
            const cached = await loadIndexCache();
            if (cached) {
                console.log('[ResourceLoader] Loaded index from cache');
                state.index = cached;
                return cached;
            }

            // Build fresh index
            console.log('[ResourceLoader] Building resource index...');
            const index = await buildResourceIndex(client, worktree, $);
            state.index = index;

            // Save to cache
            await saveIndexCache(index);

            console.log(
                `[ResourceLoader] Index built: ${index.resources.size} resources`
            );
            return index;
        } finally {
            state.indexBuilding = null;
        }
    })();

    return await state.indexBuilding;
}
```

### Memory Management

```typescript
// Cleanup old sessions periodically
function cleanupOldSessions(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    for (const [sessionID, sessionState] of state.sessions) {
        if (now - sessionState.lastActivity > maxAge) {
            state.sessions.delete(sessionID);
            console.log(
                `[ResourceLoader] Cleaned up old session: ${sessionID}`
            );
        }
    }
}

// Run cleanup every hour
setInterval(cleanupOldSessions, 60 * 60 * 1000);
```

---

## Code Templates

### Complete Plugin Template

```typescript
import type { Plugin } from '@opencode-ai/plugin';
import { tool } from '@opencode-ai/plugin/tool';

// [Insert all type definitions]
// [Insert all helper functions]
// [Insert all tool definitions]
// [Insert all hook definitions]

export default (async ({ client, project, directory, worktree, $ }) => {
    console.log(`[ResourceLoader] Initializing for project: ${project.name}`);

    // Initialize plugin state
    const state: PluginState = {
        index: null,
        indexBuilding: null,
        sessions: new Map(),
        config: {
            autoRebuildIndex: false,
            indexCachePath: `${directory}/.cache/resource-index.json`,
            persistCache: true,
            autoLoadReferences: false,
            maxReferencesDepth: 2,
            autoFlagAfterMessage: true,
            maxResourcesPerSession: 20,
            maxTotalSizePerSession: 10 * 1024 * 1024, // 10MB
            indexBuildTimeout: 30000,
            fileReadTimeout: 5000,
        },
        stats: {
            indexBuilds: 0,
            totalQueries: 0,
            totalLoads: 0,
            totalReleases: 0,
            cacheHits: 0,
            cacheMisses: 0,
        },
    };

    // [Helper function implementations using closure over state, client, $, etc.]

    return {
        // Tools
        tool: {
            'resource-query': resourceQueryTool,
            'resource-load': resourceLoadTool,
            'resource-list-loaded': resourceListLoadedTool,
            'resource-release': resourceReleaseTool,
        },

        // Hooks
        async 'chat.message'(input, output) {
            await chatMessageHook(input, output);
        },

        async 'tool.execute.after'(input, output) {
            await toolExecuteAfterHook(input, output);
        },

        async event(input) {
            await eventHook(input);
        },
    };
}) satisfies Plugin;
```

---

## Implementation Checklist

### Phase 1: Core Plugin (MVP)

- [ ] Define TypeScript interfaces for all data structures
- [ ] Implement basic resource indexing (scan directories)
- [ ] Implement frontmatter parsing
- [ ] Implement `resource-query` tool with basic filtering
- [ ] Implement `resource-load` tool
- [ ] Implement session state tracking
- [ ] Test with sample resources

### Phase 2: Enhanced Discovery

- [ ] Implement reference extraction from content
- [ ] Build reference graph (forward/backward)
- [ ] Implement domain derivation logic
- [ ] Add secondary indexes (byType, byDomain, byTag)
- [ ] Implement `resource-list-loaded` tool
- [ ] Add agent/command reference indexing

### Phase 3: Context Management

- [ ] Implement `resource-release` tool
- [ ] Implement `chat.message` hook for auto-flagging
- [ ] Implement `tool.execute.after` hook
- [ ] Implement `event` hook for session lifecycle
- [ ] Add auto-pruning logic
- [ ] Test full lifecycle flow

### Phase 4: Optimizations

- [ ] Implement index caching (serialize/deserialize)
- [ ] Add lazy index initialization
- [ ] Implement session cleanup
- [ ] Add performance metrics
- [ ] Optimize memory usage
- [ ] Add file watching for index invalidation

### Phase 5: Documentation & Polish

- [ ] Write plugin documentation
- [ ] Add usage examples
- [ ] Write troubleshooting guide
- [ ] Add inline code comments
- [ ] Create unit tests
- [ ] Create integration tests

---

## Configuration Example

```typescript
// .opencode/config.json or opencode.jsonc
{
  "plugins": {
    "dynamic-resource-loader": {
      "enabled": true,
      "config": {
        "autoRebuildIndex": false,
        "persistCache": true,
        "autoLoadReferences": false,
        "maxReferencesDepth": 2,
        "autoFlagAfterMessage": true,
        "maxResourcesPerSession": 20,
        "maxTotalSizePerSession": 10485760
      }
    }
  }
}
```

---

## Usage Examples

### Example 1: Discovering Git Resources

```
AI: I need to work with git operations. Let me search for relevant resources.

Tool: resource-query({ domain: "dev", tags: ["git"], type: "knowledge-base" })
Result: Found 3 resources including "git-operations-reference"

Tool: resource-load({ id: "git-operations-reference", includeReferences: true })
Result: Loaded knowledge-base with referenced checklists

[AI uses knowledge to complete git task]

Tool: resource-release({ ids: ["git-operations-reference"] })
Result: Resources marked for pruning
```

### Example 2: Loading Checklists

```
AI: I need to review the commit checklist before committing code.

Tool: resource-query({ type: "checklist", referencedBy: "git-vcs-specialist" })
Result: Found "git-operations-pre-commit" checklist

Tool: resource-load({ id: "git-operations-pre-commit" })
Result: Loaded checklist content

[AI follows checklist steps]

Tool: resource-release({ ids: ["git-operations-pre-commit"] })
Result: Checklist released from context
```

---

## Security Considerations

### Path Traversal Prevention

```typescript
function sanitizePath(path: string, projectRoot: string): string {
    const resolved = path.resolve(projectRoot, path);
    if (!resolved.startsWith(projectRoot)) {
        throw new Error('Path traversal detected');
    }
    return resolved;
}
```

### Size Limits

```typescript
// Enforce maximum file size
const MAX_FILE_SIZE = 1024 * 1024; // 1MB

async function readResourceFile(path: string): Promise<string> {
    const stats = await Bun.file(path).stat();
    if (stats.size > MAX_FILE_SIZE) {
        throw new Error(
            `File too large: ${formatBytes(stats.size)} (max: ${formatBytes(MAX_FILE_SIZE)})`
        );
    }
    return await Bun.file(path).text();
}
```

---

## Appendix: Utility Functions

### Formatting Utilities

```typescript
function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const result = new Set<T>();
    for (const item of setA) {
        if (setB.has(item)) {
            result.add(item);
        }
    }
    return result;
}
```

### ID Generation

```typescript
function deriveIdFromPath(path: string): string {
    // Extract filename without extension
    const basename = path.split('/').pop()!;
    return basename.replace(/\.(md|json)$/, '');
}

function deriveNameFromPath(path: string): string {
    const id = deriveIdFromPath(path);
    // Convert kebab-case to Title Case
    return id
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
```

---

**End of Specification**

This specification provides a complete blueprint for implementing the dynamic resource loader plugin. Follow the implementation checklist and refer to the code templates to build the plugin incrementally.
