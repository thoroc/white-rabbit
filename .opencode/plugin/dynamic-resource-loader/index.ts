/**
 * Dynamic Resource Loader Plugin - Barrel Export
 *
 * This module provides a centralized export point for the dynamic resource loader plugin.
 */

// Main plugin export
export { default } from './plugin';

// Type exports
export type {
    ResourceType,
    Domain,
    ResourceStatus,
    ResourceMetadata,
    ResourceIndex,
    LoadedResource,
    SessionResourceState,
    PluginState,
    PluginConfig,
    PluginStats,
    ResourceError,
    ReferenceGraph,
    SerializedIndex,
} from './types';

// Indexing utilities
export {
    parseFrontmatter,
    buildResourceIndex,
    extractResourceMetadata,
    addResourceToIndex,
    buildReferenceGraph,
    indexAgentCommandReferences,
} from './indexing';

// Cache utilities
export {
    serializeIndex,
    deserializeIndex,
    loadIndexCache,
    saveIndexCache,
    deleteCacheFile,
} from './cache';

// Session utilities
export {
    getOrCreateSessionState,
    addLoadedResource,
    isResourceLoaded,
    autoPruneResources,
    cleanupOldSessions,
    getSessionStats,
    releaseResources,
    flagResourcesForPruning,
    reactivateResources,
} from './session';

// General utilities
export {
    formatBytes,
    intersection,
    deriveIdFromPath,
    deriveDomainFromPath,
    deriveNameFromPath,
    isResourcePath,
    isResourceType,
    isDomain,
    sanitizePath,
    getRelativePath,
    extractInlineReferences,
    getFileStats,
    readResourceFile,
    fileExists,
    ensureDir,
} from './utils';
