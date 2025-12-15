import { fileExists } from '../utils';

/**
 * Delete cache file
 */
export const deleteCacheFile = async (cachePath: string): Promise<void> => {
    try {
        if (await fileExists(cachePath)) {
            const { unlink } = await import('node:fs/promises');
            await unlink(cachePath);
            console.log('[ResourceLoader] Cache file deleted');
        }
    } catch (error) {
        console.warn('[ResourceLoader] Failed to delete cache file:', error);
    }
};
