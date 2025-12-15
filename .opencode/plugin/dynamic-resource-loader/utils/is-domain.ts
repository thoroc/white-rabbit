/**
 * Type guard for Domain
 */

import type { Domain } from '../types';

export const isDomain = (domain: string): domain is Domain => {
    return ['opencode', 'core', 'docs', 'dev', 'common'].includes(domain);
};
