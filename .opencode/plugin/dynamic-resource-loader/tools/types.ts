/**
 * Shared types for tool implementations
 */

import type {
    PluginState,
    ResourceIndex,
    ResourceType,
    Domain,
} from '../types';

/**
 * Tool context shared across all tools
 */
export interface ToolContext {
    state: PluginState;
    ensureIndex: () => Promise<ResourceIndex>;
    invalidateIndexCache: () => void;
}

/**
 * Tool execution context from opencode
 */
export interface ToolExecuteContext {
    sessionID: string;
    messageID?: string;
}

/**
 * Base interface for tool arguments
 */
export interface BaseToolArgs {
    [key: string]: unknown;
}

/**
 * Resource query tool arguments
 */
export interface ResourceQueryArgs {
    type?: ResourceType | 'all';
    query?: string;
    domain?: Domain;
    tags?: string[];
    referencedBy?: string;
    limit?: number;
}

/**
 * Resource load tool arguments
 */
export interface ResourceLoadArgs {
    id: string;
    includeReferences?: boolean;
}

/**
 * Resource release tool arguments
 */
export interface ResourceReleaseArgs {
    ids?: string[];
    keep?: string[];
}

/**
 * Resource list loaded tool arguments (empty object)
 */
export interface ResourceListLoadedArgs extends BaseToolArgs {}

/**
 * Format query results tool arguments
 */
export interface FormatQueryResultsArgs extends BaseToolArgs {
    type?: ResourceType | 'all';
    query?: string;
    domain?: Domain;
    tags?: string[];
    referencedBy?: string;
    limit?: number;
}
