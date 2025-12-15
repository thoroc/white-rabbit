import type { ResourceIndex, SerializedIndex } from '../types';
import { fileExists } from '../utils';
import { deserializeIndex } from './deserialize-index';

/**
 * Load index from cache file
 */
export const loadIndexCache = async (
    cachePath: string
): Promise<ResourceIndex | null> => {
    try {
        if (!(await fileExists(cachePath))) {
            return null;
        }

        const file = Bun.file(cachePath);
        const content = await file.text();
        const serialized: SerializedIndex = JSON.parse(content);

        console.log('[ResourceLoader] Index loaded from cache');
        return deserializeIndex(serialized);
    } catch (error) {
        console.warn('[ResourceLoader] Failed to load index cache:', error);
        return null;
    }
};
