/**
 * Shared helper functions for tools
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
import { formatBytes, readResourceFile } from '../utils';

/**
 * Load referenced resources recursively
 */
export const loadReferences = async (
    references: string[],
    sessionID: string,
    toolCallID: string,
    currentDepth: number,
    maxDepth: number
): Promise<string[]> => {
    if (currentDepth > maxDepth) {
        return [];
    }

    const results: string[] = [];
    // Implementation would go here - this is a placeholder
    // The actual implementation needs access to the index and readResourceFile
    return results;
};

/**
 * Validate that a resource exists in the index
 */
export const validateResourceExists = (
    index: ResourceIndex,
    id: string
): ResourceMetadata | string => {
    const metadata = index.resources.get(id);
    if (!metadata) {
        return JSON.stringify(
            {
                error: 'ResourceNotFound',
                message: `Resource with ID '${id}' does not exist`,
                suggestion: 'Use resource-query to find available resources',
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
export const checkSessionLimits = (
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

/**
 * Format resource output with metadata and optional references
 */
export const formatResourceOutput = async (
    metadata: ResourceMetadata,
    content: string,
    includeReferences: boolean,
    context: { sessionID: string; messageID?: string },
    loadReferencesImpl: (
        refs: string[],
        sid: string,
        tid: string,
        depth: number,
        maxDepth: number
    ) => Promise<string[]>
): Promise<string> => {
    let referencedContent = '';
    if (
        includeReferences &&
        metadata.references &&
        metadata.references.length > 0
    ) {
        const refResults = await loadReferencesImpl(
            metadata.references,
            context.sessionID,
            context.messageID || context.sessionID,
            1,
            5 // maxReferencesDepth
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
        metadata.description ? `**Description:** ${metadata.description}` : '',
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
