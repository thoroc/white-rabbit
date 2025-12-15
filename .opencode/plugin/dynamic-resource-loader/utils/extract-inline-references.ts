/**
 * Extract inline references from markdown content
 * Looks for patterns like: `@reference-id` or `[[reference-id]]`
 */

export const extractInlineReferences = (content: string): string[] => {
    const references = new Set<string>();

    // Pattern: @reference-id
    const atPattern = /@([a-z0-9-]+)/gi;
    let match: RegExpExecArray | null;
    while ((match = atPattern.exec(content)) !== null) {
        references.add(match[1]);
    }

    // Pattern: [[reference-id]]
    const bracketPattern = /\[\[([a-z0-9-]+)\]\]/gi;
    while ((match = bracketPattern.exec(content)) !== null) {
        references.add(match[1]);
    }

    return Array.from(references);
};
