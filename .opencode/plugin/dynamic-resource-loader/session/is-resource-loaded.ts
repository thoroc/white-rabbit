import type { SessionResourceState } from '../types';

/**
 * Check if resource is already loaded in session
 */
export const isResourceLoaded = (
    sessionState: SessionResourceState,
    resourceId: string
): boolean => {
    return sessionState.loaded.has(resourceId);
};
