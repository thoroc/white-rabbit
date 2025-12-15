import type { PluginState } from '../types';

/**
 * Cleanup old sessions periodically
 */
export const cleanupOldSessions = (state: PluginState): void => {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    for (const [sessionID, sessionState] of state.sessions) {
        if (now - sessionState.lastActivity > maxAge) {
            state.sessions.delete(sessionID);
            console.log(
                `[ResourceLoader] Cleaned up old session: ${sessionID}`
            );
        }
    }
};
