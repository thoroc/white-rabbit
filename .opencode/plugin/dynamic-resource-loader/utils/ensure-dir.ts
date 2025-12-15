/**
 * Create directory if it doesn't exist
 */

export const ensureDir = async (dirPath: string): Promise<void> => {
    try {
        await Bun.write(`${dirPath}/.keep`, '', { createPath: true });
    } catch (error) {
        console.warn(`Failed to create directory ${dirPath}:`, error);
    }
};
