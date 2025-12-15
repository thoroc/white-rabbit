/**
 * Cache management for resource index
 */

import type { ResourceIndex, SerializedIndex } from './types';
import { fileExists, ensureDir } from './utils';
import { dirname } from 'node:path';

/**
 * Serialize resource index for storage
 */
export const serializeIndex = (index: ResourceIndex): SerializedIndex => {
    return {
        version: index.version,
        generatedAt: index.generatedAt,
        projectRoot: index.projectRoot,
        resources: Array.from(index.resources.entries()),
        byType: Array.from(index.byType.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        byDomain: Array.from(index.byDomain.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        byTag: Array.from(index.byTag.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        byReference: Array.from(index.byReference.entries()).map(([k, v]) => [
            k,
            Array.from(v),
        ]),
        graph: {
            forward: Array.from(index.graph.forward.entries()).map(([k, v]) => [
                k,
                Array.from(v),
            ]),
            backward: Array.from(index.graph.backward.entries()).map(
                ([k, v]) => [k, Array.from(v)]
            ),
            agents: Array.from(index.graph.agents.entries()).map(([k, v]) => [
                k,
                Array.from(v),
            ]),
            commands: Array.from(index.graph.commands.entries()).map(
                ([k, v]) => [k, Array.from(v)]
            ),
        },
    };
};

/**
 * Deserialize resource index from storage
 */
export const deserializeIndex = (
    serialized: SerializedIndex
): ResourceIndex => {
    return {
        version: serialized.version,
        generatedAt: serialized.generatedAt,
        projectRoot: serialized.projectRoot,
        resources: new Map(serialized.resources),
        byType: new Map(serialized.byType.map(([k, v]) => [k, new Set(v)])),
        byDomain: new Map(serialized.byDomain.map(([k, v]) => [k, new Set(v)])),
        byTag: new Map(serialized.byTag.map(([k, v]) => [k, new Set(v)])),
        byReference: new Map(
            serialized.byReference.map(([k, v]) => [k, new Set(v)])
        ),
        graph: {
            forward: new Map(
                serialized.graph.forward.map(([k, v]) => [k, new Set(v)])
            ),
            backward: new Map(
                serialized.graph.backward.map(([k, v]) => [k, new Set(v)])
            ),
            agents: new Map(
                serialized.graph.agents.map(([k, v]) => [k, new Set(v)])
            ),
            commands: new Map(
                serialized.graph.commands.map(([k, v]) => [k, new Set(v)])
            ),
        },
    };
};

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

/**
 * Delete cache file
 */
export const deleteCacheFile = async (cachePath: string): Promise<void> => {
    try {
        if (await fileExists(cachePath)) {
            await Bun.$`rm ${cachePath}`;
            console.log('[ResourceLoader] Cache file deleted');
        }
    } catch (error) {
        console.warn('[ResourceLoader] Failed to delete cache file:', error);
    }
};
