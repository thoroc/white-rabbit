/**
 * Get relative path from project root
 */

import { relative } from 'node:path';

export const getRelativePath = (
    absolutePath: string,
    projectRoot: string
): string => {
    return relative(projectRoot, absolutePath);
};
