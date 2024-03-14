const calculateTotal = <T>(array: T[], property: keyof T): number => {
    let total = 0;

    for (const item of array) {
        const propertyValue = item[property] as number;
        total += typeof propertyValue === 'number' ? propertyValue : 0;
    }

    return total;
};

export { calculateTotal };
