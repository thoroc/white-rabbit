import type { SessionResourceState } from '../types';

/**
 * Get or create session state
 */
export const getOrCreateSessionState = (
    sessions: Map<string, SessionResourceState>,
    sessionID: string
): SessionResourceState => {
    let sessionState = sessions.get(sessionID);

    if (!sessionState) {
        sessionState = {
            sessionID,
            loaded: new Map(),
            totalLoaded: 0,
            totalSize: 0,
            createdAt: Date.now(),
            lastActivity: Date.now(),
        };
        sessions.set(sessionID, sessionState);
        console.log(`[ResourceLoader] Created new session state: ${sessionID}`);
    }

    return sessionState;
};
