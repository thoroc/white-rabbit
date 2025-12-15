/**
 * Resource indexing logic
 */

import matter from 'gray-matter';
import { Glob } from 'bun';
import type { ResourceIndex, ResourceMetadata, ResourceType } from './types';
import {
    deriveDomainFromPath,
    deriveIdFromPath,
    deriveNameFromPath,
    extractInlineReferences,
    getFileStats,
    getRelativePath,
    readResourceFile,
} from './utils';

/**
 * Parse frontmatter from file content using gray-matter
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseFrontmatter = (content: string): Record<string, any> => {
    try {
        const { data } = matter(content);
        return data;
    } catch (error) {
        console.warn('[ResourceIndex] Error parsing frontmatter:', error);
        return {};
    }
};

/**
 * Extract resource metadata from file
 */
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
                frontmatter.title ||
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

/**
 * Add resource to index with all secondary indexes
 */
export const addResourceToIndex = (
    index: ResourceIndex,
    metadata: ResourceMetadata
): void => {
    const { id, type, domain, tags, referencedBy } = metadata;

    // Add to primary storage
    index.resources.set(id, metadata);

    // Add to type index
    if (!index.byType.has(type)) {
        index.byType.set(type, new Set());
    }
    index.byType.get(type)!.add(id);

    // Add to domain index
    if (!index.byDomain.has(domain)) {
        index.byDomain.set(domain, new Set());
    }
    index.byDomain.get(domain)!.add(id);

    // Add to tag indexes
    if (tags) {
        for (const tag of tags) {
            if (!index.byTag.has(tag)) {
                index.byTag.set(tag, new Set());
            }
            index.byTag.get(tag)!.add(id);
        }
    }

    // Add to reference indexes
    if (referencedBy) {
        for (const ref of referencedBy) {
            if (!index.byReference.has(ref)) {
                index.byReference.set(ref, new Set());
            }
            index.byReference.get(ref)!.add(id);
        }
    }
};

/**
 * Build reference graph from indexed resources
 */
export const buildReferenceGraph = (index: ResourceIndex): void => {
    // Build forward and backward reference graphs
    for (const [id, metadata] of index.resources) {
        if (metadata.references && metadata.references.length > 0) {
            // Initialize forward references
            if (!index.graph.forward.has(id)) {
                index.graph.forward.set(id, new Set());
            }

            for (const refId of metadata.references) {
                // Add to forward graph
                index.graph.forward.get(id)!.add(refId);

                // Add to backward graph
                if (!index.graph.backward.has(refId)) {
                    index.graph.backward.set(refId, new Set());
                }
                index.graph.backward.get(refId)!.add(id);
            }
        }
    }
};

/**
 * Scan files using Bun's glob
 */
const scanFiles = async (
    baseDir: string,
    pattern: string
): Promise<string[]> => {
    const files: string[] = [];
    const glob = new Glob(pattern);

    try {
        for await (const file of glob.scan({ cwd: baseDir, absolute: true })) {
            files.push(file);
        }
    } catch (error) {
        console.warn(`[ResourceIndex] Error scanning ${baseDir}:`, error);
    }

    return files;
};

/**
 * Index agent and command references by scanning agent/command files
 */
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

/**
 * Build complete resource index
 */
export const buildResourceIndex = async (
    worktree: string
): Promise<ResourceIndex> => {
    const index: ResourceIndex = {
        version: '1.0.0',
        generatedAt: Date.now(),
        projectRoot: worktree,
        resources: new Map(),
        byType: new Map(),
        byDomain: new Map(),
        byTag: new Map(),
        byReference: new Map(),
        graph: {
            forward: new Map(),
            backward: new Map(),
            agents: new Map(),
            commands: new Map(),
        },
    };

    // Define resource paths
    const resourcePaths: Array<[ResourceType, string, string]> = [
        ['checklist', `${worktree}/.opencode/checklist`, '**/*.md'],
        ['knowledge-base', `${worktree}/.opencode/knowledge-base`, '**/*.md'],
        ['schema', `${worktree}/.opencode/schema`, '**/*.json'],
        ['task', `${worktree}/.opencode/task`, '**/*.md'],
        ['template', `${worktree}/.opencode/template`, '**/*.md'],
    ];

    // Scan each resource type
    for (const [type, baseDir, pattern] of resourcePaths) {
        try {
            const files = await scanFiles(baseDir, pattern);

            // Process each file
            for (const filePath of files) {
                try {
                    const metadata = await extractResourceMetadata(
                        filePath,
                        type,
                        worktree
                    );

                    if (metadata) {
                        addResourceToIndex(index, metadata);
                    }
                } catch (error) {
                    console.warn(
                        `[ResourceIndex] Error processing ${filePath}:`,
                        error
                    );
                }
            }
        } catch (error) {
            console.error(`[ResourceIndex] Error scanning ${type}:`, error);
        }
    }

    // Build reference graph
    buildReferenceGraph(index);

    // Index agent and command references
    await indexAgentCommandReferences(worktree, index);

    console.log(
        `[ResourceIndex] Index built: ${index.resources.size} resources indexed`
    );

    return index;
};
