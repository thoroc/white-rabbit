/**
 * Resource loading and session management helpers
 */

import type {
    ResourceIndex,
    ResourceMetadata,
    SessionResourceState,
    LoadedResource,
} from '../types';
import {
    getOrCreateSessionState,
    addLoadedResource,
    isResourceLoaded,
} from '../session';
import { readResourceFile } from '../utils';

/**
 * Create loadReferences function with access to state
 */
export const createLoadReferences = (
    state: any,
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
