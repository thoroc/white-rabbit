/**
 * Resource loading and session management helpers
 */

import type {
    ResourceIndex,
    ResourceMetadata,
    SessionResourceState,
    LoadedResource,
    PluginState,
    PluginConfig,
    ResourceType,
    Domain,
} from '../types';
import type { FormatQueryResultsArgs } from './types';
import {
    getOrCreateSessionState,
    addLoadedResource,
    isResourceLoaded,
} from '../session';
import { readResourceFile, formatBytes, intersection } from '../utils';

/**
 * Filter resources by type, domain, tags, and references
 */
export const filterQueryResources = (
    index: ResourceIndex,
    type?: string,
    domain?: string,
    tags?: string[],
    referencedBy?: string
): Set<string> => {
    let candidateIds = new Set(index.resources.keys());

    if (type && type !== 'all') {
        const typeIds = index.byType.get(type as ResourceType);
        candidateIds = typeIds
            ? intersection(candidateIds, typeIds)
            : new Set();
    }

    if (domain) {
        const domainIds = index.byDomain.get(domain as Domain);
        candidateIds = domainIds
            ? intersection(candidateIds, domainIds)
            : new Set();
    }

    if (tags && tags.length > 0) {
        for (const tag of tags) {
            const tagIds = index.byTag.get(tag);
            if (!tagIds) {
                candidateIds.clear();
                break;
            }
            candidateIds = intersection(candidateIds, tagIds);
        }
    }

    if (referencedBy) {
        const refIds = index.byReference.get(referencedBy);
        candidateIds = refIds ? intersection(candidateIds, refIds) : new Set();
    }

    return candidateIds;
};

/**
 * Create loadReferences function with access to state
 */
export const createLoadReferences = (
    state: {
        sessions: Map<string, SessionResourceState>;
        config: { maxResourcesPerSession: number };
        stats: { totalLoads: number };
    },
    ensureIndex: () => Promise<ResourceIndex>
) => {
    const loadReferences = async (
        references: string[],
        sessionID: string,
        toolCallID: string,
        currentDepth: number,
        maxDepth: number
    ): Promise<string[]> => {
        if (currentDepth > maxDepth) {
            return [];
        }

        const index = await ensureIndex();
        const sessionState = getOrCreateSessionState(state.sessions, sessionID);
        const results: string[] = [];

        for (const refId of references) {
            const metadata = index.resources.get(refId);
            if (!metadata) {
                continue;
            }

            // Check if already loaded
            if (isResourceLoaded(sessionState, refId)) {
                continue;
            }

            // Check session limits
            if (
                sessionState.loaded.size >= state.config.maxResourcesPerSession
            ) {
                break;
            }

            try {
                const content = await readResourceFile(metadata.path);

                // Track loaded resource
                const loadedResource: LoadedResource = {
                    id: refId,
                    type: metadata.type,
                    path: metadata.path,
                    loadedAt: Date.now(),
                    loadedInMessage: toolCallID,
                    toolCallID,
                    status: 'active',
                    size: metadata.size,
                    includeReferences: false,
                };

                addLoadedResource(sessionState, loadedResource);
                state.stats.totalLoads++;

                // Format output
                const output = [
                    `## Referenced: ${metadata.name}`,
                    `**Type:** ${metadata.type} | **Domain:** ${metadata.domain}`,
                    `**ID:** ${metadata.id}`,
                    '',
                    content,
                ].join('\n');

                results.push(output);

                // Recursively load nested references
                if (metadata.references && metadata.references.length > 0) {
                    const nestedResults = await loadReferences(
                        metadata.references,
                        sessionID,
                        toolCallID,
                        currentDepth + 1,
                        maxDepth
                    );
                    results.push(...nestedResults);
                }
            } catch (error) {
                console.warn(
                    `[ResourceLoader] Failed to load reference ${refId}:`,
                    error
                );
            }
        }

        return results;
    };

    return loadReferences;
};

/**
 * Apply text search to filtered resources
 */
export const applyTextSearch = (
    index: ResourceIndex,
    candidateIds: Set<string>,
    query?: string
): ResourceMetadata[] => {
    const results: ResourceMetadata[] = [];

    for (const id of candidateIds) {
        const metadata = index.resources.get(id);
        if (!metadata) continue;

        if (query) {
            const queryLower = query.toLowerCase();
            const searchText = [
                metadata.name,
                metadata.description || '',
                ...(metadata.tags || []),
            ]
                .join(' ')
                .toLowerCase();

            if (searchText.includes(queryLower)) {
                results.push(metadata);
            }
        } else {
            results.push(metadata);
        }
    }

    return results;
};

/**
 * Format query results for output
 */
export const formatQueryResults = (
    args: FormatQueryResultsArgs,
    limitedResults: ResourceMetadata[],
    totalResults: number
): string => {
    return JSON.stringify(
        {
            query: args,
            results: limitedResults.map((m) => ({
                id: m.id,
                type: m.type,
                name: m.name,
                domain: m.domain,
                description: m.description,
                tags: m.tags,
                path: m.relativePath,
                size: formatBytes(m.size),
            })),
            total: totalResults,
            showing: limitedResults.length,
            hint: 'Use resource-load with an ID to fetch full content',
        },
        null,
        2
    );
};

/**
 * Load resource content and track it in session
 */
export const loadResourceContent = async (
    metadata: ResourceMetadata,
    resourceId: string,
    sessionState: SessionResourceState,
    context: { sessionID: string; messageID?: string },
    includeReferences: boolean,
    statsCounter: { totalLoads: number }
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
    statsCounter.totalLoads++;

    return content;
};
