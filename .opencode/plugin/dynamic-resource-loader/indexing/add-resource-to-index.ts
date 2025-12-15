/**
 * Add resource to index with all secondary indexes
 */

import type { ResourceIndex, ResourceMetadata } from '../types';

export const addResourceToIndex = (
    index: ResourceIndex,
    metadata: ResourceMetadata
): void => {
    const { id, type, domain, tags, referencedBy } = metadata;

    // Add to primary storage
    index.resources.set(id, metadata);

    // Add to type index
    if (!index.byType.has(type)) {
        index.byType.set(type, new Set());
    }
    index.byType.get(type)!.add(id);

    // Add to domain index
    if (!index.byDomain.has(domain)) {
        index.byDomain.set(domain, new Set());
    }
    index.byDomain.get(domain)!.add(id);

    // Add to tag indexes
    if (tags) {
        for (const tag of tags) {
            if (!index.byTag.has(tag)) {
                index.byTag.set(tag, new Set());
            }
            index.byTag.get(tag)!.add(id);
        }
    }

    // Add to reference indexes
    if (referencedBy) {
        for (const ref of referencedBy) {
            if (!index.byReference.has(ref)) {
                index.byReference.set(ref, new Set());
            }
            index.byReference.get(ref)!.add(id);
        }
    }
};
