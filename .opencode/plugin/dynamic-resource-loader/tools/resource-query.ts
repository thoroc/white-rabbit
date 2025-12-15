/**
 * Resource Query Tool
 *
 * Search for available resources by type, name, tags, domain, or references.
 */

import type { ResourceType, Domain, ResourceMetadata } from '../types';
import type { ToolContext } from './types';
import { intersection, formatBytes } from '../utils';

export const createResourceQueryTool = (context: ToolContext) => ({
    description:
        'Search for available resources (checklists, knowledge-base, schemas, tasks, templates) by type, name, tags, domain, or references. Use this to discover what resources are available before loading them.',
    args: {
        type: {
            type: 'string',
            enum: [
                'checklist',
                'knowledge-base',
                'schema',
                'task',
                'template',
                'all',
            ],
            optional: true,
            description: 'Filter by resource type',
        },

        query: {
            type: 'string',
            optional: true,
            description:
                'Search term to match against name, description, or tags',
        },

        domain: {
            type: 'string',
            enum: ['opencode', 'core', 'docs', 'dev', 'common'],
            optional: true,
            description: 'Filter by domain',
        },

        tags: {
            type: 'array',
            items: { type: 'string' },
            optional: true,
            description: 'Filter by tags (AND logic - all tags must match)',
        },

        referencedBy: {
            type: 'string',
            optional: true,
            description:
                'Filter by agent or command name that references the resource',
        },

        limit: {
            type: 'number',
            minimum: 1,
            maximum: 50,
            default: 10,
            description: 'Maximum number of results to return',
        },
    },

    async execute(args: any, _context: any) {
        try {
            // Ensure index is built
            const index = await context.ensureIndex();

            // Start with all resources
            let candidateIds = new Set(index.resources.keys());

            // Apply filters
            if (args.type && args.type !== 'all') {
                const typeIds = index.byType.get(args.type as ResourceType);
                if (typeIds) {
                    candidateIds = intersection(candidateIds, typeIds);
                } else {
                    candidateIds.clear();
                }
            }

            if (args.domain) {
                const domainIds = index.byDomain.get(args.domain as Domain);
                if (domainIds) {
                    candidateIds = intersection(candidateIds, domainIds);
                } else {
                    candidateIds.clear();
                }
            }

            if (args.tags && args.tags.length > 0) {
                for (const tag of args.tags) {
                    const tagIds = index.byTag.get(tag);
                    if (tagIds) {
                        candidateIds = intersection(candidateIds, tagIds);
                    } else {
                        candidateIds.clear();
                        break;
                    }
                }
            }

            if (args.referencedBy) {
                const refIds = index.byReference.get(args.referencedBy);
                if (refIds) {
                    candidateIds = intersection(candidateIds, refIds);
                } else {
                    candidateIds.clear();
                }
            }

            // Apply text search
            const results: ResourceMetadata[] = [];
            for (const id of candidateIds) {
                const metadata = index.resources.get(id);
                if (!metadata) continue;

                if (args.query) {
                    const query = args.query.toLowerCase();
                    const searchText = [
                        metadata.name,
                        metadata.description || '',
                        ...(metadata.tags || []),
                    ]
                        .join(' ')
                        .toLowerCase();

                    if (searchText.includes(query)) {
                        results.push(metadata);
                    }
                } else {
                    results.push(metadata);
                }
            }

            // Sort by relevance (simple: by name)
            results.sort((a, b) => a.name.localeCompare(b.name));

            // Limit results
            const limited = results.slice(0, args.limit);

            // Update stats
            context.state.stats.totalQueries++;

            // Format output
            return JSON.stringify(
                {
                    query: args,
                    results: limited.map((m) => ({
                        id: m.id,
                        type: m.type,
                        name: m.name,
                        domain: m.domain,
                        description: m.description,
                        tags: m.tags,
                        path: m.relativePath,
                        size: formatBytes(m.size),
                    })),
                    total: results.length,
                    showing: limited.length,
                    hint: 'Use resource-load with an ID to fetch the full content',
                },
                null,
                2
            );
        } catch (error) {
            return JSON.stringify(
                {
                    error: 'QueryError',
                    message:
                        error instanceof Error ? error.message : String(error),
                },
                null,
                2
            );
        }
    },
});
