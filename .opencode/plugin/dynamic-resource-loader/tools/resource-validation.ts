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
