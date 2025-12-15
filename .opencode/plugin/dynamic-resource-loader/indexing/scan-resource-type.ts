/**
 * Scan and process all files for a given resource type
 */

import type { ResourceIndex, ResourceType } from '../types';
import { scanFiles } from './scan-files';
import { processResourceFile } from './process-resource-file';

export const scanResourceType = async (
    type: ResourceType,
    baseDir: string,
    pattern: string,
    worktree: string,
    index: ResourceIndex
): Promise<void> => {
    try {
        const files = await scanFiles(baseDir, pattern);

        for (const filePath of files) {
            await processResourceFile(filePath, type, worktree, index);
        }
    } catch (error) {
        console.error(`[ResourceIndex] Error scanning ${type}:`, error);
    }
};
