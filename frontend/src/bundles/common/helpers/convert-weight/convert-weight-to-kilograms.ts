const convertWeightToKilograms = (grams: number | null): number | null => {
    if (grams) {
        return grams / 1000;
    }
    return null;
};

export { convertWeightToKilograms };
