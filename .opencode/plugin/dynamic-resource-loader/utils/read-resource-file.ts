/**
 * Read file content using Bun's native API with size limit
 */

import { formatBytes } from './format-bytes';

export const readResourceFile = async (
    path: string,
    maxSize = 1024 * 1024
): Promise<string> => {
    const file = Bun.file(path);
    const stat = await file.stat();

    if (stat.size > maxSize) {
        throw new Error(
            `File too large: ${formatBytes(stat.size)} (max: ${formatBytes(maxSize)})`
        );
    }

    return await file.text();
};
