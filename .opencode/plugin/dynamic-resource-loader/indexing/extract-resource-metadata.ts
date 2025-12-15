/**
 * Extract resource metadata from file
 */

import type { ResourceMetadata, ResourceType } from '../types';
import {
    deriveDomainFromPath,
    deriveIdFromPath,
    deriveNameFromPath,
    extractInlineReferences,
    getFileStats,
    getRelativePath,
    readResourceFile,
} from '../utils';
import { parseFrontmatter } from './parse-frontmatter';

export const extractResourceMetadata = async (
    filePath: string,
    type: ResourceType,
    projectRoot: string
): Promise<ResourceMetadata | null> => {
    try {
        // Read file content
        const content = await readResourceFile(filePath);

        // Parse frontmatter
        const frontmatter = parseFrontmatter(content);

        // Derive domain from path
        const domain = deriveDomainFromPath(filePath);

        // Extract ID (from frontmatter or filename)
        const id = frontmatter.id || deriveIdFromPath(filePath);

        // Get file stats
        const stats = await getFileStats(filePath);

        // Extract references from frontmatter and inline content
        const frontmatterRefs = Array.isArray(frontmatter.references)
            ? frontmatter.references
            : [];
        const inlineRefs = extractInlineReferences(content);
        const allReferences = [...new Set([...frontmatterRefs, ...inlineRefs])];

        return {
            id,
            type,
            path: filePath,
            relativePath: getRelativePath(filePath, projectRoot),
            name:
                frontmatter.title ||
                frontmatter.name ||
                deriveNameFromPath(filePath),
            domain,
            category: frontmatter.category,
            tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
            description: frontmatter.description,
            version: frontmatter.version,
            references: allReferences.length > 0 ? allReferences : undefined,
            referencedBy: Array.isArray(frontmatter.referencedBy)
                ? frontmatter.referencedBy
                : [],
            size: stats.size,
            lastModified: stats.mtime,
            author: frontmatter.author,
            created: frontmatter.created,
            updated: frontmatter.updated,
            difficulty: frontmatter.difficulty,
            status: frontmatter.status,
        };
    } catch (error) {
        console.error(
            `[ResourceIndex] Error extracting metadata from ${filePath}:`,
            error
        );
        return null;
    }
};
