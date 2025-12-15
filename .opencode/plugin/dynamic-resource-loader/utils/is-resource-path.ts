/**
 * Check if a path is a resource path
 */

export const isResourcePath = (path: string): boolean => {
    const resourceTypes = [
        'checklist',
        'knowledge-base',
        'schema',
        'task',
        'template',
    ];
    return resourceTypes.some((type) => path.includes(`/.opencode/${type}/`));
};
