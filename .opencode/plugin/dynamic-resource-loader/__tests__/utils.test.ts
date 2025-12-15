/**
 * Tests for utility functions
 */

import { describe, it, expect } from 'bun:test';
import {
    formatBytes,
    intersection,
    deriveIdFromPath,
    deriveNameFromPath,
    deriveDomainFromPath,
    isResourcePath,
    isResourceType,
    isDomain,
    extractInlineReferences,
} from '../utils';

describe('Utility Functions', () => {
    describe('formatBytes', () => {
        it('should format 0 bytes', () => {
            expect(formatBytes(0)).toBe('0 B');
        });

        it('should format bytes', () => {
            expect(formatBytes(100)).toBe('100.00 B');
        });

        it('should format kilobytes', () => {
            expect(formatBytes(1024)).toBe('1.00 KB');
            expect(formatBytes(2048)).toBe('2.00 KB');
        });

        it('should format megabytes', () => {
            expect(formatBytes(1024 * 1024)).toBe('1.00 MB');
            expect(formatBytes(5 * 1024 * 1024)).toBe('5.00 MB');
        });
    });

    describe('intersection', () => {
        it('should return intersection of two sets', () => {
            const setA = new Set([1, 2, 3, 4]);
            const setB = new Set([3, 4, 5, 6]);
            const result = intersection(setA, setB);
            expect(Array.from(result)).toEqual([3, 4]);
        });

        it('should return empty set when no overlap', () => {
            const setA = new Set([1, 2]);
            const setB = new Set([3, 4]);
            const result = intersection(setA, setB);
            expect(result.size).toBe(0);
        });

        it('should return empty set when one set is empty', () => {
            const setA = new Set([1, 2]);
            const setB = new Set<number>();
            const result = intersection(setA, setB);
            expect(result.size).toBe(0);
        });
    });

    describe('deriveIdFromPath', () => {
        it('should extract id from markdown file', () => {
            expect(deriveIdFromPath('/path/to/my-resource.md')).toBe(
                'my-resource'
            );
        });

        it('should extract id from json file', () => {
            expect(deriveIdFromPath('/path/to/schema.json')).toBe('schema');
        });

        it('should handle complex paths', () => {
            expect(
                deriveIdFromPath('/project/.opencode/checklist/pre-commit.md')
            ).toBe('pre-commit');
        });
    });

    describe('deriveNameFromPath', () => {
        it('should convert kebab-case to Title Case', () => {
            expect(deriveNameFromPath('/path/to/my-cool-resource.md')).toBe(
                'My Cool Resource'
            );
        });

        it('should handle single word', () => {
            expect(deriveNameFromPath('/path/to/readme.md')).toBe('Readme');
        });
    });

    describe('deriveDomainFromPath', () => {
        it('should detect opencode domain', () => {
            expect(
                deriveDomainFromPath('/project/.opencode/opencode/test.md')
            ).toBe('opencode');
        });

        it('should detect core domain', () => {
            expect(
                deriveDomainFromPath('/project/.opencode/core/test.md')
            ).toBe('core');
        });

        it('should detect docs domain', () => {
            expect(
                deriveDomainFromPath('/project/.opencode/docs/test.md')
            ).toBe('docs');
        });

        it('should detect dev domain', () => {
            expect(deriveDomainFromPath('/project/.opencode/dev/test.md')).toBe(
                'dev'
            );
        });

        it('should default to common domain', () => {
            expect(deriveDomainFromPath('/project/.opencode/test.md')).toBe(
                'common'
            );
        });
    });

    describe('isResourcePath', () => {
        it('should detect checklist path', () => {
            expect(isResourcePath('/.opencode/checklist/test.md')).toBe(true);
        });

        it('should detect knowledge-base path', () => {
            expect(isResourcePath('/.opencode/knowledge-base/test.md')).toBe(
                true
            );
        });

        it('should reject non-resource path', () => {
            expect(isResourcePath('/.opencode/agent/test.md')).toBe(false);
            expect(isResourcePath('/src/index.ts')).toBe(false);
        });
    });

    describe('isResourceType', () => {
        it('should validate resource types', () => {
            expect(isResourceType('checklist')).toBe(true);
            expect(isResourceType('knowledge-base')).toBe(true);
            expect(isResourceType('schema')).toBe(true);
            expect(isResourceType('task')).toBe(true);
            expect(isResourceType('template')).toBe(true);
        });

        it('should reject invalid types', () => {
            expect(isResourceType('agent')).toBe(false);
            expect(isResourceType('command')).toBe(false);
            expect(isResourceType('invalid')).toBe(false);
        });
    });

    describe('isDomain', () => {
        it('should validate domains', () => {
            expect(isDomain('opencode')).toBe(true);
            expect(isDomain('core')).toBe(true);
            expect(isDomain('docs')).toBe(true);
            expect(isDomain('dev')).toBe(true);
            expect(isDomain('common')).toBe(true);
        });

        it('should reject invalid domains', () => {
            expect(isDomain('invalid')).toBe(false);
            expect(isDomain('other')).toBe(false);
        });
    });

    describe('extractInlineReferences', () => {
        it('should extract @ references', () => {
            const content = 'See @resource-one and @resource-two for details';
            const refs = extractInlineReferences(content);
            expect(refs).toContain('resource-one');
            expect(refs).toContain('resource-two');
        });

        it('should extract [[]] references', () => {
            const content = 'Check [[resource-one]] and [[resource-two]]';
            const refs = extractInlineReferences(content);
            expect(refs).toContain('resource-one');
            expect(refs).toContain('resource-two');
        });

        it('should extract mixed references', () => {
            const content = 'See @resource-one and [[resource-two]]';
            const refs = extractInlineReferences(content);
            expect(refs).toContain('resource-one');
            expect(refs).toContain('resource-two');
            expect(refs.length).toBe(2);
        });

        it('should return empty array for no references', () => {
            const content = 'No references here';
            const refs = extractInlineReferences(content);
            expect(refs.length).toBe(0);
        });

        it('should deduplicate references', () => {
            const content =
                'See @resource and [[resource]] and @resource again';
            const refs = extractInlineReferences(content);
            expect(refs.filter((r) => r === 'resource').length).toBe(1);
        });
    });
});
