import type { SessionResourceState } from '../types';

/**
 * Get session statistics
 */
export const getSessionStats = (sessionState: SessionResourceState) => {
    return {
        sessionID: sessionState.sessionID,
        activeResources: sessionState.loaded.size,
        totalLoaded: sessionState.totalLoaded,
        totalSize: sessionState.totalSize,
        createdAt: new Date(sessionState.createdAt).toISOString(),
        lastActivity: new Date(sessionState.lastActivity).toISOString(),
    };
};
