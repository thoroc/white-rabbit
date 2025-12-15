/**
 * Define resource paths for scanning
 */

import type { ResourceType } from '../types';

export const getResourcePaths = (
    worktree: string
): Array<[ResourceType, string, string]> => [
    ['checklist', `${worktree}/.opencode/checklist`, '**/*.md'],
    ['knowledge-base', `${worktree}/.opencode/knowledge-base`, '**/*.md'],
    ['schema', `${worktree}/.opencode/schema`, '**/*.json'],
    ['task', `${worktree}/.opencode/task`, '**/*.md'],
    ['template', `${worktree}/.opencode/template`, '**/*.md'],
];
