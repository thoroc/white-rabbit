/**
 * Build complete resource index
 */

import type { ResourceIndex } from '../types';
import { getResourcePaths } from './get-resource-paths';
import { scanResourceType } from './scan-resource-type';
import { buildReferenceGraph } from './build-reference-graph';
import { indexAgentCommandReferences } from './index-agent-command-references';

export const buildResourceIndex = async (
    worktree: string
): Promise<ResourceIndex> => {
    const index: ResourceIndex = {
        version: '1.0.0',
        generatedAt: Date.now(),
        projectRoot: worktree,
        resources: new Map(),
        byType: new Map(),
        byDomain: new Map(),
        byTag: new Map(),
        byReference: new Map(),
        graph: {
            forward: new Map(),
            backward: new Map(),
            agents: new Map(),
            commands: new Map(),
        },
    };

    // Scan each resource type
    const resourcePaths = getResourcePaths(worktree);
    for (const [type, baseDir, pattern] of resourcePaths) {
        await scanResourceType(type, baseDir, pattern, worktree, index);
    }

    // Build reference graph
    buildReferenceGraph(index);

    // Index agent and command references
    await indexAgentCommandReferences(worktree, index);

    console.log(
        `[ResourceIndex] Index built: ${index.resources.size} resources indexed`
    );

    return index;
};
