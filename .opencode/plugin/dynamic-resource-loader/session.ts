/**
 * Session management and resource lifecycle tracking
 */

import type {
    SessionResourceState,
    LoadedResource,
    PluginState,
} from './types';

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

/**
 * Auto-prune resources that have been flagged or released
 */
export const autoPruneResources = async (
    sessionID: string,
    state: PluginState
): Promise<void> => {
    const sessionState = state.sessions.get(sessionID);
    if (!sessionState) return;

    const toPrune: string[] = [];

    for (const [id, resource] of sessionState.loaded) {
        // Prune resources that have been flagged or released
        if (resource.status === 'flagged' || resource.status === 'released') {
            resource.status = 'pruned';
            resource.prunedAt = Date.now();
            toPrune.push(id);
        }
    }

    // Remove pruned resources from active tracking
    for (const id of toPrune) {
        sessionState.loaded.delete(id);
    }

    if (toPrune.length > 0) {
        console.log(
            `[ResourceLoader] Auto-pruned ${toPrune.length} resources from session ${sessionID}`
        );
    }
};

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

/**
 * Check if resource is already loaded in session
 */
export const isResourceLoaded = (
    sessionState: SessionResourceState,
    resourceId: string
): boolean => {
    return sessionState.loaded.has(resourceId);
};

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
