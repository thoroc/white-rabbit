import type { SessionResourceState, LoadedResource } from '../types';

/**
 * Add loaded resource to session
 */
export const addLoadedResource = (
    sessionState: SessionResourceState,
    resource: LoadedResource
): void => {
    sessionState.loaded.set(resource.id, resource);
    sessionState.totalLoaded++;
    sessionState.totalSize += resource.size;
    sessionState.lastActivity = Date.now();
};
