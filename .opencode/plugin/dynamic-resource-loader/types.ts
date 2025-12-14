/**
 * Type definitions for Dynamic Resource Loader Plugin
 */

export type ResourceType =
    | 'checklist'
    | 'knowledge-base'
    | 'schema'
    | 'task'
    | 'template';

export type Domain = 'opencode' | 'core' | 'docs' | 'dev' | 'common';

export type ResourceStatus = 'active' | 'flagged' | 'released' | 'pruned';

export interface ResourceMetadata {
    // Identity
    id: string;
    type: ResourceType;

    // File information
    path: string;
    relativePath: string;
    name: string;

    // Classification
    domain: Domain;
    category?: string;

    // Metadata
    tags?: string[];
    description?: string;
    version?: string;

    // References
    references?: string[];
    referencedBy?: string[];

    // File attributes
    size: number;
    lastModified: number;

    // Optional fields
    author?: string;
    created?: string;
    updated?: string;
    difficulty?: string;
    status?: string;
}

export interface ReferenceGraph {
    // Forward references: resource -> resources it references
    forward: Map<string, Set<string>>;

    // Backward references: resource -> resources that reference it
    backward: Map<string, Set<string>>;

    // Agent/command references: name -> resource IDs
    agents: Map<string, Set<string>>;
    commands: Map<string, Set<string>>;
}

export interface ResourceIndex {
    version: string;
    generatedAt: number;
    projectRoot: string;

    // Primary storage
    resources: Map<string, ResourceMetadata>;

    // Secondary indexes for fast lookups
    byType: Map<ResourceType, Set<string>>;
    byDomain: Map<Domain, Set<string>>;
    byTag: Map<string, Set<string>>;
    byReference: Map<string, Set<string>>;

    // Reference graph
    graph: ReferenceGraph;
}

export interface LoadedResource {
    id: string;
    type: ResourceType;
    path: string;

    // Tracking
    loadedAt: number;
    loadedInMessage: string;
    toolCallID: string;

    // Lifecycle
    status: ResourceStatus;
    flaggedAt?: number;
    prunedAt?: number;

    // Metadata
    size: number;
    includeReferences: boolean;
}

export interface SessionResourceState {
    sessionID: string;

    // Loaded resources
    loaded: Map<string, LoadedResource>;

    // Statistics
    totalLoaded: number;
    totalSize: number;

    // Timestamps
    createdAt: number;
    lastActivity: number;
}

export interface PluginConfig {
    // Index behavior
    autoRebuildIndex: boolean;
    indexCachePath: string;
    persistCache: boolean;

    // Loading behavior
    autoLoadReferences: boolean;
    maxReferencesDepth: number;

    // Context management
    autoFlagAfterMessage: boolean;
    maxResourcesPerSession: number;
    maxTotalSizePerSession: number;

    // Performance
    indexBuildTimeout: number;
    fileReadTimeout: number;
}

export interface PluginStats {
    indexBuilds: number;
    totalQueries: number;
    totalLoads: number;
    totalReleases: number;
    cacheHits: number;
    cacheMisses: number;
}

export interface PluginState {
    // Index
    index: ResourceIndex | null;
    indexBuilding: Promise<ResourceIndex> | null;

    // Session tracking
    sessions: Map<string, SessionResourceState>;

    // Configuration
    config: PluginConfig;

    // Statistics
    stats: PluginStats;
}

export type ResourceError =
    | { type: 'ResourceNotFound'; id: string }
    | { type: 'FileReadError'; path: string; error: string }
    | { type: 'IndexBuildError'; error: string }
    | { type: 'SessionLimitReached'; limit: number }
    | { type: 'InvalidReference'; reference: string }
    | { type: 'QueryError'; message: string };

export interface SerializedIndex {
    version: string;
    generatedAt: number;
    projectRoot: string;
    resources: Array<[string, ResourceMetadata]>;
    byType: Array<[ResourceType, string[]]>;
    byDomain: Array<[Domain, string[]]>;
    byTag: Array<[string, string[]]>;
    byReference: Array<[string, string[]]>;
    graph: {
        forward: Array<[string, string[]]>;
        backward: Array<[string, string[]]>;
        agents: Array<[string, string[]]>;
        commands: Array<[string, string[]]>;
    };
}
