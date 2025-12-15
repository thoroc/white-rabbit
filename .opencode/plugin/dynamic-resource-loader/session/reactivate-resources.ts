import type { SessionResourceState } from '../types';

/**
 * Reactivate resources (called when resource-load is used again)
 */
export const reactivateResources = (
    sessionState: SessionResourceState
): void => {
    for (const resource of sessionState.loaded.values()) {
        if (resource.status === 'flagged') {
            resource.status = 'active';
            resource.flaggedAt = undefined;
        }
    }
};
