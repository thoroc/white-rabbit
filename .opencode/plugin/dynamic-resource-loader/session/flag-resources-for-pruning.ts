import type { SessionResourceState } from '../types';

/**
 * Flag resources for pruning (called after message)
 */
export const flagResourcesForPruning = (
    sessionState: SessionResourceState,
    currentMessageID: string
): number => {
    let flagged = 0;

    for (const resource of sessionState.loaded.values()) {
        if (
            resource.status === 'active' &&
            resource.loadedInMessage !== currentMessageID
        ) {
            resource.status = 'flagged';
            resource.flaggedAt = Date.now();
            flagged++;
        }
    }

    return flagged;
};
