/**
 * Check if file exists
 */

export const fileExists = async (path: string): Promise<boolean> => {
    try {
        const file = Bun.file(path);
        return await file.exists();
    } catch {
        return false;
    }
};
