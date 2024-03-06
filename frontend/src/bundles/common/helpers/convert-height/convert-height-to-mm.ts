const convertHeightToMillimeters = (
    height: string | number | null,
): number | null => {
    if (height === null) {
        return null;
    }

    const heightInCm =
        typeof height === 'string' ? Number.parseFloat(height) : height;

    return Number.isNaN(heightInCm) ? null : Math.round(heightInCm * 10);
};

export { convertHeightToMillimeters };
