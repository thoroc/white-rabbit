/**
 * Scan files using Bun's glob
 */

import { Glob } from 'bun';

export const scanFiles = async (
    baseDir: string,
    pattern: string
): Promise<string[]> => {
    const files: string[] = [];
    const glob = new Glob(pattern);

    try {
        for await (const file of glob.scan({ cwd: baseDir, absolute: true })) {
            files.push(file);
        }
    } catch (error) {
        console.warn(`[ResourceIndex] Error scanning ${baseDir}:`, error);
    }

    return files;
};
