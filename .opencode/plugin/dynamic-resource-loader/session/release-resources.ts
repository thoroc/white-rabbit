import type { SessionResourceState } from '../types';

/**
 * Release resources from session
 */
export const releaseResources = (
    sessionState: SessionResourceState,
    resourceIds: string[]
): { released: string[]; notFound: string[] } => {
    const released: string[] = [];
    const notFound: string[] = [];

    for (const id of resourceIds) {
        const loadedResource = sessionState.loaded.get(id);
        if (loadedResource) {
            loadedResource.status = 'released';
            loadedResource.flaggedAt = Date.now();
            released.push(id);
        } else {
            notFound.push(id);
        }
    }

    return { released, notFound };
};
