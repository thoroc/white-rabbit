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

export const indexAgentCommandReferences = async (
    worktree: string,
    index: ResourceIndex
): Promise<void> => {
    try {
        // Scan agent files
        const agentDir = `${worktree}/.opencode/agent`;
        const agentFiles = await scanFiles(agentDir, '**/*.md');

        for (const filePath of agentFiles) {
            const agentName = deriveIdFromPath(filePath);
            try {
                const content = await readResourceFile(filePath);
                const references = extractInlineReferences(content);

                if (references.length > 0) {
                    index.graph.agents.set(agentName, new Set(references));

                    // Add to byReference index
                    for (const refId of references) {
                        if (!index.byReference.has(agentName)) {
                            index.byReference.set(agentName, new Set());
                        }
                        index.byReference.get(agentName)!.add(refId);
                    }
                }
            } catch (error) {
                console.warn(
                    `[ResourceIndex] Error reading agent ${filePath}:`,
                    error
                );
            }
        }

        // Scan command files
        const commandDir = `${worktree}/.opencode/command`;
        const commandFiles = await scanFiles(commandDir, '**/*.md');

        for (const filePath of commandFiles) {
            const commandName = deriveIdFromPath(filePath);
            try {
                const content = await readResourceFile(filePath);
                const references = extractInlineReferences(content);

                if (references.length > 0) {
                    index.graph.commands.set(commandName, new Set(references));

                    // Add to byReference index
                    for (const refId of references) {
                        if (!index.byReference.has(commandName)) {
                            index.byReference.set(commandName, new Set());
                        }
                        index.byReference.get(commandName)!.add(refId);
                    }
                }
            } catch (error) {
                console.warn(
                    `[ResourceIndex] Error reading command ${filePath}:`,
                    error
                );
            }
        }
    } catch (error) {
        console.warn(
            '[ResourceIndex] Error indexing agent/command references:',
            error
        );
    }
};
