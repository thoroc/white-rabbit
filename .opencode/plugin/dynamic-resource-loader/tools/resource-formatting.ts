/**
 * Resource formatting helpers
 */

import type { ResourceMetadata } from '../types';
import { formatBytes } from '../utils';

/**
 * Format resource output with metadata and optional references
 */
export const formatResourceOutput = async (
    metadata: ResourceMetadata,
    content: string,
    includeReferences: boolean,
    context: { sessionID: string; messageID?: string },
    loadReferencesImpl: (
        refs: string[],
        sid: string,
        tid: string,
        depth: number,
        maxDepth: number
    ) => Promise<string[]>,
    maxReferencesDepth: number
): Promise<string> => {
    let referencedContent = '';

    if (
        includeReferences &&
        metadata.references &&
        metadata.references.length > 0
    ) {
        const referenceOutputs = await loadReferencesImpl(
            metadata.references,
            context.sessionID,
            context.messageID || context.sessionID,
            0,
            maxReferencesDepth
        );

        referencedContent = ['', '**References:**', ...referenceOutputs].join(
            '\n'
        );
    }

    return [
        `# ${metadata.name}`,
        `**Type:** ${metadata.type} | **Domain:** ${metadata.domain}`,
        `**ID:** ${metadata.id}`,
        `**Size:** ${formatBytes(metadata.size)}`,
        `**Path:** ${metadata.relativePath}`,
        metadata.description ? `**Description:** ${metadata.description}` : '',
        metadata.tags && metadata.tags.length > 0
            ? `**Tags:** ${metadata.tags.join(', ')}`
            : '',
        '',
        '```',
        content,
        '```',
        referencedContent,
    ]
        .filter((line) => line.length > 0)
        .join('\n');
};
