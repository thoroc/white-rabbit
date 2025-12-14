/**
 * Utility functions for Dynamic Resource Loader Plugin
 */

import { resolve, relative } from 'node:path';
import type { Domain, ResourceType, ResourceError } from './types.ts';

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Get intersection of two sets
 */
export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const result = new Set<T>();
    for (const item of setA) {
        if (setB.has(item)) {
            result.add(item);
        }
    }
    return result;
}

/**
 * Derive resource ID from file path
 */
export function deriveIdFromPath(path: string): string {
    const basename = path.split('/').pop()!;
    return basename.replace(/\.(md|json)$/, '');
}

/**
 * Derive display name from path
 */
export function deriveNameFromPath(path: string): string {
    const id = deriveIdFromPath(path);
    return id
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Derive domain from file path based on CLAUDE.md conventions
 */
export function deriveDomainFromPath(filePath: string): Domain {
    if (filePath.includes('/opencode/')) return 'opencode';
    if (filePath.includes('/core/')) return 'core';
    if (filePath.includes('/docs/')) return 'docs';
    if (filePath.includes('/dev/')) return 'dev';
    return 'common';
}

/**
 * Check if a path is a resource path
 */
export function isResourcePath(path: string): boolean {
    const resourceTypes = [
        'checklist',
        'knowledge-base',
        'schema',
        'task',
        'template',
    ];
    return resourceTypes.some((type) => path.includes(`/.opencode/${type}/`));
}

/**
 * Type guard for ResourceType
 */
export function isResourceType(type: string): type is ResourceType {
    return [
        'checklist',
        'knowledge-base',
        'schema',
        'task',
        'template',
    ].includes(type);
}

/**
 * Type guard for Domain
 */
export function isDomain(domain: string): domain is Domain {
    return ['opencode', 'core', 'docs', 'dev', 'common'].includes(domain);
}

/**
 * Sanitize path to prevent path traversal attacks
 */
export function sanitizePath(path: string, projectRoot: string): string {
    const resolved = resolve(projectRoot, path);
    if (!resolved.startsWith(projectRoot)) {
        throw new Error('Path traversal detected');
    }
    return resolved;
}

/**
 * Get relative path from project root
 */
export function getRelativePath(
    absolutePath: string,
    projectRoot: string
): string {
    return relative(projectRoot, absolutePath);
}

/**
 * Extract inline references from markdown content
 * Looks for patterns like: @reference-id or [[reference-id]]
 */
export function extractInlineReferences(content: string): string[] {
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
}

/**
 * Format error for display
 */
export function formatError(error: ResourceError): string {
    switch (error.type) {
        case 'ResourceNotFound':
            return JSON.stringify(
                {
                    error: 'ResourceNotFound',
                    message: `Resource '${error.id}' does not exist`,
                    suggestion:
                        'Use resource-query to find available resources',
                },
                null,
                2
            );

        case 'FileReadError':
            return JSON.stringify(
                {
                    error: 'FileReadError',
                    path: error.path,
                    message: error.error,
                },
                null,
                2
            );

        case 'IndexBuildError':
            return JSON.stringify(
                {
                    error: 'IndexBuildError',
                    message: error.error,
                    suggestion:
                        'Check .opencode directory structure and file permissions',
                },
                null,
                2
            );

        case 'SessionLimitReached':
            return JSON.stringify(
                {
                    error: 'SessionLimitReached',
                    message: `Maximum of ${error.limit} resources per session`,
                    suggestion: 'Use resource-release to free up space',
                },
                null,
                2
            );

        case 'InvalidReference':
            return JSON.stringify(
                {
                    error: 'InvalidReference',
                    message: `Invalid reference: ${error.reference}`,
                },
                null,
                2
            );

        case 'QueryError':
            return JSON.stringify(
                {
                    error: 'QueryError',
                    message: error.message,
                },
                null,
                2
            );

        default:
            return JSON.stringify(
                { error: 'Unknown', message: 'An unknown error occurred' },
                null,
                2
            );
    }
}

/**
 * Get file statistics using Bun's native API
 */
export async function getFileStats(
    filePath: string
): Promise<{ size: number; mtime: number }> {
    try {
        const file = Bun.file(filePath);
        const stat = await file.stat();
        return {
            size: stat.size,
            mtime: stat.mtime.getTime(),
        };
    } catch (error) {
        throw new Error(`Failed to get file stats: ${error}`);
    }
}

/**
 * Read file content using Bun's native API with size limit
 */
export async function readResourceFile(
    path: string,
    maxSize = 1024 * 1024
): Promise<string> {
    const file = Bun.file(path);
    const stat = await file.stat();

    if (stat.size > maxSize) {
        throw new Error(
            `File too large: ${formatBytes(stat.size)} (max: ${formatBytes(maxSize)})`
        );
    }

    return await file.text();
}

/**
 * Check if file exists
 */
export async function fileExists(path: string): Promise<boolean> {
    try {
        const file = Bun.file(path);
        return await file.exists();
    } catch {
        return false;
    }
}

/**
 * Create directory if it doesn't exist
 */
export async function ensureDir(dirPath: string): Promise<void> {
    try {
        await Bun.write(`${dirPath}/.keep`, '', { createPath: true });
    } catch (error) {
        console.warn(`Failed to create directory ${dirPath}:`, error);
    }
}
