/**
 * Process a single resource file and add to index
 */

import type { ResourceIndex, ResourceType } from '../types';
import { extractResourceMetadata } from './extract-resource-metadata';
import { addResourceToIndex } from './add-resource-to-index';

export const processResourceFile = async (
    filePath: string,
    type: ResourceType,
    worktree: string,
    index: ResourceIndex
): Promise<void> => {
    try {
        const metadata = await extractResourceMetadata(
            filePath,
            type,
            worktree
        );

        if (metadata) {
            addResourceToIndex(index, metadata);
        }
    } catch (error) {
        console.warn(`[ResourceIndex] Error processing ${filePath}:`, error);
    }
};
