/**
 * Derive domain from file path based on CLAUDE.md conventions
 */

import type { Domain } from '../types';

export const deriveDomainFromPath = (filePath: string): Domain => {
    if (filePath.includes('/opencode/')) return 'opencode';
    if (filePath.includes('/core/')) return 'core';
    if (filePath.includes('/docs/')) return 'docs';
    if (filePath.includes('/dev/')) return 'dev';
    return 'common';
};
