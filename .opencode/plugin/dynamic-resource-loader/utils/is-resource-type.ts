/**
 * Type guard for ResourceType
 */

import type { ResourceType } from '../types';

export const isResourceType = (type: string): type is ResourceType => {
    return [
        'checklist',
        'knowledge-base',
        'schema',
        'task',
        'template',
    ].includes(type);
};
