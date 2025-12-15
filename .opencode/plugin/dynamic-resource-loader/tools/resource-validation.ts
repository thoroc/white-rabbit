/**
 * Resource validation helpers
 */

import type {
    ResourceIndex,
    ResourceMetadata,
    SessionResourceState,
} from '../types';
import { isResourceLoaded } from '../session';

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
        const domainIds = index.byDomain.get(domain as any);
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
