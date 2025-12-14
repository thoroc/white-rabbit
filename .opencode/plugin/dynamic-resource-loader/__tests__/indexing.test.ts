/**
 * Tests for indexing functions
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import {
    parseFrontmatter,
    addResourceToIndex,
    buildReferenceGraph,
} from '../indexing.ts';
import type { ResourceIndex, ResourceMetadata } from '../types.ts';

describe('Indexing Functions', () => {
    describe('parseFrontmatter', () => {
        it('should parse valid YAML frontmatter', () => {
            const content = `---
title: Test Resource
description: A test resource
tags: [tag1, tag2]
version: 1.0.0
---
Content here`;

            const result = parseFrontmatter(content);
            expect(result.title).toBe('Test Resource');
            expect(result.description).toBe('A test resource');
            expect(result.version).toBe('1.0.0');
            expect(result.tags).toEqual(['tag1', 'tag2']);
        });

        it('should handle content without frontmatter', () => {
            const content = 'Just regular content';
            const result = parseFrontmatter(content);
            expect(Object.keys(result).length).toBe(0);
        });

        it('should handle empty frontmatter', () => {
            const content = `---
---
Content`;
            const result = parseFrontmatter(content);
            expect(Object.keys(result).length).toBe(0);
        });
    });

    describe('addResourceToIndex', () => {
        let index: ResourceIndex;

        beforeEach(() => {
            index = {
                version: '1.0.0',
                generatedAt: Date.now(),
                projectRoot: '/test',
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
        });

        it('should add resource to all indexes', () => {
            const metadata: ResourceMetadata = {
                id: 'test-resource',
                type: 'checklist',
                path: '/test/checklist/test-resource.md',
                relativePath: 'checklist/test-resource.md',
                name: 'Test Resource',
                domain: 'dev',
                tags: ['git', 'vcs'],
                size: 1024,
                lastModified: Date.now(),
            };

            addResourceToIndex(index, metadata);

            // Check primary storage
            expect(index.resources.has('test-resource')).toBe(true);

            // Check type index
            expect(index.byType.get('checklist')?.has('test-resource')).toBe(
                true
            );

            // Check domain index
            expect(index.byDomain.get('dev')?.has('test-resource')).toBe(true);

            // Check tag indexes
            expect(index.byTag.get('git')?.has('test-resource')).toBe(true);
            expect(index.byTag.get('vcs')?.has('test-resource')).toBe(true);
        });

        it('should handle multiple resources of same type', () => {
            const metadata1: ResourceMetadata = {
                id: 'resource-1',
                type: 'task',
                path: '/test/task/resource-1.md',
                relativePath: 'task/resource-1.md',
                name: 'Resource 1',
                domain: 'core',
                size: 512,
                lastModified: Date.now(),
            };

            const metadata2: ResourceMetadata = {
                id: 'resource-2',
                type: 'task',
                path: '/test/task/resource-2.md',
                relativePath: 'task/resource-2.md',
                name: 'Resource 2',
                domain: 'core',
                size: 512,
                lastModified: Date.now(),
            };

            addResourceToIndex(index, metadata1);
            addResourceToIndex(index, metadata2);

            const taskResources = index.byType.get('task');
            expect(taskResources?.size).toBe(2);
            expect(taskResources?.has('resource-1')).toBe(true);
            expect(taskResources?.has('resource-2')).toBe(true);
        });
    });

    describe('buildReferenceGraph', () => {
        it('should build forward and backward references', () => {
            const index: ResourceIndex = {
                version: '1.0.0',
                generatedAt: Date.now(),
                projectRoot: '/test',
                resources: new Map([
                    [
                        'resource-a',
                        {
                            id: 'resource-a',
                            type: 'checklist',
                            path: '/test/a.md',
                            relativePath: 'a.md',
                            name: 'Resource A',
                            domain: 'core',
                            references: ['resource-b', 'resource-c'],
                            size: 100,
                            lastModified: Date.now(),
                        },
                    ],
                    [
                        'resource-b',
                        {
                            id: 'resource-b',
                            type: 'knowledge-base',
                            path: '/test/b.md',
                            relativePath: 'b.md',
                            name: 'Resource B',
                            domain: 'core',
                            size: 100,
                            lastModified: Date.now(),
                        },
                    ],
                ]),
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

            buildReferenceGraph(index);

            // Check forward references
            const forwardRefs = index.graph.forward.get('resource-a');
            expect(forwardRefs?.has('resource-b')).toBe(true);
            expect(forwardRefs?.has('resource-c')).toBe(true);

            // Check backward references
            const backwardRefs = index.graph.backward.get('resource-b');
            expect(backwardRefs?.has('resource-a')).toBe(true);
        });
    });
});
