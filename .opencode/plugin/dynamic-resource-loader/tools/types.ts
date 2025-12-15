/**
 * Shared types for tool implementations
 */

import type { PluginState, ResourceIndex } from '../types';

/**
 * Tool context shared across all tools
 */
export interface ToolContext {
    state: PluginState;
    ensureIndex: () => Promise<ResourceIndex>;
    invalidateIndexCache: () => void;
}
