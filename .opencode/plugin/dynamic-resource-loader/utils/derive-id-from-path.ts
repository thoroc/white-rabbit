/**
 * Derive resource ID from file path
 */

export const deriveIdFromPath = (path: string): string => {
    const basename = path.split('/').pop()!;
    return basename.replace(/\.(md|json)$/, '');
};
