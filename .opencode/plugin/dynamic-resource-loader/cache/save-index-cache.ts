import type { ResourceIndex } from '../types';
import { dirname } from 'node:path';
import { ensureDir } from '../utils';
import { serializeIndex } from './serialize-index';

/**
 * Save index to cache file
 */
export const saveIndexCache = async (
    index: ResourceIndex,
    cachePath: string
): Promise<void> => {
    try {
        // Ensure cache directory exists
        const cacheDir = dirname(cachePath);
        await ensureDir(cacheDir);

        // Serialize and save
        const serialized = serializeIndex(index);
        await Bun.write(cachePath, JSON.stringify(serialized, null, 2));

        console.log('[ResourceLoader] Index cache saved to', cachePath);
    } catch (error) {
        console.warn('[ResourceLoader] Failed to save index cache:', error);
    }
};
