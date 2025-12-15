/**
 * Parse frontmatter from file content using gray-matter
 */

import matter from 'gray-matter';

/**
 * Frontmatter data structure
 */
export interface FrontmatterData {
    [key: string]: unknown;
    title?: string;
    description?: string;
    tags?: string[];
    version?: string;
    author?: string;
    created?: string;
    updated?: string;
    difficulty?: string;
    status?: string;
    references?: string[];
    referencedBy?: string[];
    category?: string;
    domain?: string;
}

export const parseFrontmatter = (content: string): FrontmatterData => {
    try {
        const { data } = matter(content);
        return data as FrontmatterData;
    } catch (error) {
        console.warn('[ResourceIndex] Error parsing frontmatter:', error);
        return {};
    }
};
