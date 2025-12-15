/**
 * Sanitize path to prevent path traversal attacks
 */

import { resolve } from 'node:path';

export const sanitizePath = (path: string, projectRoot: string): string => {
    const resolved = resolve(projectRoot, path);
    if (!resolved.startsWith(projectRoot)) {
        throw new Error('Path traversal detected');
    }
    return resolved;
};
