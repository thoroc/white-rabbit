/**
 * Parse frontmatter from file content using gray-matter
 */

import matter from 'gray-matter';

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
