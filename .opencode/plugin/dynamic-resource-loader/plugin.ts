/**
 * Dynamic Resource Loader Plugin
 *
 * Enables dynamic discovery, loading, and context management of project resources
 * (checklists, knowledge-base, schema, task, template)
 */

import type { Plugin, PluginInput } from '@opencode-ai/plugin';
import { tool } from '@opencode-ai/plugin/tool';
import type {
    PluginState,
    ResourceIndex,
    LoadedResource,
    ResourceType,
    Domain,
    ResourceMetadata,
    SessionResourceState,
} from './types';
import { buildResourceIndex } from './indexing';
import { loadIndexCache, saveIndexCache, deleteCacheFile } from './cache';
import {
    getOrCreateSessionState,
    autoPruneResources,
    cleanupOldSessions,
    addLoadedResource,
    isResourceLoaded,
    getSessionStats,
    releaseResources,
    flagResourcesForPruning,
    reactivateResources,
} from './session';
import {
    formatBytes,
    intersection,
    readResourceFile,
    isResourcePath,
} from './utils';

export default (async ({ directory, worktree }: PluginInput) => {
    console.log(`[ResourceLoader] Initializing plugin`);

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

    /**
     * Ensure index is built and cached
     */
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
                if (state.config.persistCache) {
                    const cached = await loadIndexCache(
                        state.config.indexCachePath
                    );
                    if (cached) {
                        state.index = cached;
                        return cached;
                    }
                }

                // Build fresh index
                console.log('[ResourceLoader] Building resource index...');
                const index = await buildResourceIndex(worktree);
                state.index = index;
                state.stats.indexBuilds++;

                // Save to cache
                if (state.config.persistCache) {
                    await saveIndexCache(index, state.config.indexCachePath);
                }

                return index;
            } finally {
                state.indexBuilding = null;
            }
        })();

        return await state.indexBuilding;
    }

    /**
     * Invalidate index cache
     */
    function invalidateIndexCache(): void {
        state.index = null;
        if (state.config.persistCache) {
            deleteCacheFile(state.config.indexCachePath);
        }
        console.log('[ResourceLoader] Index cache invalidated');
    }

    /**
     * Load referenced resources recursively
     */
    async function loadReferences(
        references: string[],
        sessionID: string,
        messageID: string,
        currentDepth: number,
        maxDepth: number
    ): Promise<string[]> {
        if (currentDepth >= maxDepth) {
            return [];
        }

        const index = await ensureIndex();
        const results: string[] = [];

        for (const refId of references) {
            const metadata = index.resources.get(refId);
            if (!metadata) {
                console.warn(
                    `[ResourceLoader] Referenced resource not found: ${refId}`
                );
                continue;
            }

            try {
                const content = await readResourceFile(metadata.path);
                results.push(`## Referenced: ${metadata.name}\n\n${content}`);

                // Recursively load references
                if (
                    metadata.references &&
                    metadata.references.length > 0 &&
                    currentDepth + 1 < maxDepth
                ) {
                    const nestedResults = await loadReferences(
                        metadata.references,
                        sessionID,
                        messageID,
                        currentDepth + 1,
                        maxDepth
                    );
                    results.push(...nestedResults);
                }
            } catch (error) {
                console.warn(
                    `[ResourceLoader] Error loading reference ${refId}:`,
                    error
                );
            }
        }

        return results;
    }

    /**
     * Validate that a resource exists in the index
     */
    const validateResourceExists = (
        index: ResourceIndex,
        id: string
    ): ResourceMetadata | string => {
        const metadata = index.resources.get(id);
        if (!metadata) {
            return JSON.stringify(
                {
                    error: 'ResourceNotFound',
                    message: `Resource with ID '${id}' does not exist`,
                    suggestion:
                        'Use resource-query to find available resources',
                },
                null,
                2
            );
        }
        return metadata;
    };

    /**
     * Check session limits before loading a resource
     */
    const checkSessionLimits = (
        sessionState: SessionResourceState,
        resourceId: string,
        maxResources: number
    ): string | null => {
        if (isResourceLoaded(sessionState, resourceId)) {
            return JSON.stringify(
                {
                    warning: 'AlreadyLoaded',
                    message: `Resource '${resourceId}' is already loaded in this session`,
                    loadedAt: sessionState.loaded
                        .get(resourceId)!
                        .loadedAt.toString(),
                },
                null,
                2
            );
        }

        if (sessionState.loaded.size >= maxResources) {
            return JSON.stringify(
                {
                    error: 'SessionLimitReached',
                    message: `Maximum of ${maxResources} resources per session`,
                    suggestion: 'Use resource-release to free up space',
                },
                null,
                2
            );
        }

        return null;
    };

    /**
     * Load resource content and track it in session
     */
    const loadResourceContent = async (
        metadata: ResourceMetadata,
        resourceId: string,
        sessionState: SessionResourceState,
        context: { sessionID: string; messageID?: string },
        includeReferences: boolean
    ): Promise<string> => {
        const content = await readResourceFile(metadata.path);

        const loadedResource: LoadedResource = {
            id: resourceId,
            type: metadata.type,
            path: metadata.path,
            loadedAt: Date.now(),
            loadedInMessage: context.messageID || context.sessionID,
            toolCallID: context.sessionID,
            status: 'active',
            size: metadata.size,
            includeReferences,
        };

        addLoadedResource(sessionState, loadedResource);
        state.stats.totalLoads++;

        return content;
    };

    /**
     * Format resource output with metadata and optional references
     */
    const formatResourceOutput = async (
        metadata: ResourceMetadata,
        content: string,
        includeReferences: boolean,
        context: { sessionID: string; messageID?: string }
    ): Promise<string> => {
        let referencedContent = '';
        if (
            includeReferences &&
            metadata.references &&
            metadata.references.length > 0
        ) {
            const refResults = await loadReferences(
                metadata.references,
                context.sessionID,
                context.messageID || context.sessionID,
                1,
                state.config.maxReferencesDepth
            );
            if (refResults.length > 0) {
                referencedContent =
                    '\n\n---\n\n# Referenced Resources\n\n' +
                    refResults.join('\n\n---\n\n');
            }
        }

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
    };

    /**
     * Handle session.created event
     */
    const handleSessionCreated = (
        properties: Record<string, unknown>
    ): void => {
        if ('sessionID' in properties) {
            getOrCreateSessionState(
                state.sessions,
                properties.sessionID as string
            );
        }
    };

    /**
     * Handle session.deleted event
     */
    const handleSessionDeleted = (
        properties: Record<string, unknown>
    ): void => {
        if ('sessionID' in properties) {
            const sessionID = properties.sessionID as string;
            state.sessions.delete(sessionID);
        }
    };

    /**
     * Handle session.idle event
     */
    const handleSessionIdle = async (
        properties: Record<string, unknown>
    ): Promise<void> => {
        if ('sessionID' in properties) {
            const sessionID = properties.sessionID as string;
            await autoPruneResources(sessionID, state);
        }
    };

    /**
     * Handle file.edited event
     */
    const handleFileEdited = (properties: Record<string, unknown>): void => {
        if ('path' in properties) {
            const path = properties.path as string;
            if (isResourcePath(path)) {
                invalidateIndexCache();
            }
        }
    };

    // Tool 1: resource-query
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

        async execute(args, _context) {
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
                const results: ResourceMetadata[] = [];
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
                            error instanceof Error
                                ? error.message
                                : String(error),
                    },
                    null,
                    2
                );
            }
        },
    });

    // Tool 2: resource-load
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
                const validationResult = validateResourceExists(index, args.id);
                if (typeof validationResult === 'string') {
                    return validationResult;
                }
                const metadata = validationResult;

                // Check session limits
                const sessionState = getOrCreateSessionState(
                    state.sessions,
                    context.sessionID
                );

                const limitError = checkSessionLimits(
                    sessionState,
                    args.id,
                    state.config.maxResourcesPerSession
                );
                if (limitError) {
                    return limitError;
                }

                // Load resource content and track in session
                const content = await loadResourceContent(
                    metadata,
                    args.id,
                    sessionState,
                    context,
                    args.includeReferences
                );

                // Format and return output with optional references
                return await formatResourceOutput(
                    metadata,
                    content,
                    args.includeReferences,
                    context
                );
            } catch (error) {
                return JSON.stringify(
                    {
                        error: 'LoadError',
                        message:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    },
                    null,
                    2
                );
            }
        },
    });

    // Tool 3: resource-list-loaded
    const resourceListLoadedTool = tool({
        description:
            'List all resources currently loaded in this session context, including their status and metadata',
        args: {},

        async execute(_args, context) {
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
                        ...getSessionStats(sessionState),
                        loaded: loadedList,
                        totalSize: formatBytes(sessionState.totalSize),
                    },
                    null,
                    2
                );
            } catch (error) {
                return JSON.stringify(
                    {
                        error: 'ListError',
                        message:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    },
                    null,
                    2
                );
            }
        },
    });

    // Tool 4: resource-release
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

                const { released, notFound } = releaseResources(
                    sessionState,
                    toRelease
                );

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
                            error instanceof Error
                                ? error.message
                                : String(error),
                    },
                    null,
                    2
                );
            }
        },
    });

    // Setup cleanup interval
    const cleanupInterval = setInterval(
        () => {
            cleanupOldSessions(state);
        },
        60 * 60 * 1000
    ); // Every hour

    // Return plugin interface
    return {
        tool: {
            'resource-query': resourceQueryTool,
            'resource-load': resourceLoadTool,
            'resource-list-loaded': resourceListLoadedTool,
            'resource-release': resourceReleaseTool,
        },

        async 'chat.message'(input, _output) {
            try {
                const sessionState = getOrCreateSessionState(
                    state.sessions,
                    input.sessionID
                );
                sessionState.lastActivity = Date.now();

                // Auto-flag resources if configured
                if (state.config.autoFlagAfterMessage && input.messageID) {
                    flagResourcesForPruning(sessionState, input.messageID);
                }
            } catch (error) {
                console.error(
                    '[ResourceLoader] Error in chat.message hook:',
                    error
                );
            }
        },

        async 'tool.execute.after'(input, output) {
            try {
                // Track resource-load tool executions
                if (input.tool === 'resource-load') {
                    const sessionState = state.sessions.get(input.sessionID);
                    if (sessionState) {
                        // Mark all resources in this session as active
                        reactivateResources(sessionState);
                    }

                    // Add pruning hint to metadata
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
        },

        async event(input) {
            try {
                const event = input.event;

                switch (event.type) {
                    case 'session.created':
                        handleSessionCreated(event.properties);
                        break;

                    case 'session.deleted':
                        handleSessionDeleted(event.properties);
                        break;

                    case 'session.idle':
                        await handleSessionIdle(event.properties);
                        break;

                    case 'file.edited':
                        handleFileEdited(event.properties);
                        break;
                }
            } catch (error) {
                console.error('[ResourceLoader] Error in event hook:', error);
            }
        },

        async cleanup() {
            // Clear cleanup interval
            clearInterval(cleanupInterval);
            console.log('[ResourceLoader] Plugin cleanup complete');
        },
    };
}) satisfies Plugin;
