/**
 * Derive display name from path
 */

import { deriveIdFromPath } from './derive-id-from-path';

export const deriveNameFromPath = (path: string): string => {
    const id = deriveIdFromPath(path);
    return id
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
