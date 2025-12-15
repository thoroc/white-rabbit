import type { PluginState } from '../types';

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
