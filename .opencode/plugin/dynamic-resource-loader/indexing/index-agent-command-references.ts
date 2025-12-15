/**
 * Index agent and command references by scanning agent/command files
 */

import type { ResourceIndex } from '../types';
import {
    deriveIdFromPath,
    extractInlineReferences,
    readResourceFile,
} from '../utils';
import { scanFiles } from './scan-files';

const scanResourceFiles = async (
    resourceDir: string,
    resourceType: 'agents' | 'commands',
    index: ResourceIndex
): Promise<void> => {
    const files = await scanFiles(resourceDir, '**/*.md');
    const graphMap =
        resourceType === 'agents' ? index.graph.agents : index.graph.commands;

    for (const filePath of files) {
        const resourceName = deriveIdFromPath(filePath);
        try {
            const content = await readResourceFile(filePath);
            const references = extractInlineReferences(content);

            if (references.length > 0) {
                graphMap.set(resourceName, new Set(references));

                // Add to byReference index
                if (!index.byReference.has(resourceName)) {
                    index.byReference.set(resourceName, new Set());
                }
                const refSet = index.byReference.get(resourceName)!;
                for (const refId of references) {
                    refSet.add(refId);
                }
            }
        } catch (error) {
            console.warn(
                `[ResourceIndex] Error reading ${resourceType.slice(0, -1)} ${filePath}:`,
                error
            );
        }
    }
};

export const indexAgentCommandReferences = async (
    worktree: string,
    index: ResourceIndex
): Promise<void> => {
    try {
        await scanResourceFiles(`${worktree}/.opencode/agent`, 'agents', index);

        await scanResourceFiles(
            `${worktree}/.opencode/command`,
            'commands',
            index
        );
    } catch (error) {
        console.warn(
            '[ResourceIndex] Error indexing agent/command references:',
            error
        );
    }
};
