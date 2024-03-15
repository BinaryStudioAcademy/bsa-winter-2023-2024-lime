const getUniqueValues = <T, K extends keyof T>(array: T[], key: K): T[] => {
    const uniqueValues: T[] = [];
    const keysSet: Set<T[K]> = new Set();

    for (const item of array) {
        const value = item[key];
        if (!keysSet.has(value)) {
            keysSet.add(value);
            uniqueValues.push(item);
        }
    }

    return uniqueValues;
};

export { getUniqueValues };
