/**
 * Get intersection of two sets
 */

export const intersection = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
    const result = new Set<T>();
    for (const item of setA) {
        if (setB.has(item)) {
            result.add(item);
        }
    }
    return result;
};
