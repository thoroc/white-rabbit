/**
 * Get file statistics using Bun's native API
 */

export const getFileStats = async (
    filePath: string
): Promise<{ size: number; mtime: number }> => {
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
};
