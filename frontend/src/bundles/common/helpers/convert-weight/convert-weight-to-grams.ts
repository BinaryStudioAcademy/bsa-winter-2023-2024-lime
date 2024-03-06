const convertWeightToGrams = (
    weight: string | number | null,
): number | null => {
    if (weight === null) {
        return null;
    }

    const weightInKg =
        typeof weight === 'string' ? Number.parseFloat(weight) : weight;

    return Number.isNaN(weightInKg)
        ? null
        : Math.round(weightInKg * 1000 * 100) / 100;
};

export { convertWeightToGrams };
