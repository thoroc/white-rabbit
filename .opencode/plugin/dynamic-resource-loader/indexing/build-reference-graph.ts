/**
 * Build reference graph from indexed resources
 */

import type { ResourceIndex } from '../types';

export const buildReferenceGraph = (index: ResourceIndex): void => {
    // Build forward and backward reference graphs
    for (const [id, metadata] of index.resources) {
        if (metadata.references && metadata.references.length > 0) {
            // Initialize forward references
            if (!index.graph.forward.has(id)) {
                index.graph.forward.set(id, new Set());
            }

            for (const refId of metadata.references) {
                // Add to forward graph
                index.graph.forward.get(id)!.add(refId);

                // Add to backward graph
                if (!index.graph.backward.has(refId)) {
                    index.graph.backward.set(refId, new Set());
                }
                index.graph.backward.get(refId)!.add(id);
            }
        }
    }
};
