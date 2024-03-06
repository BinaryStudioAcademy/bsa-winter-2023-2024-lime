const convertHeightToCentimeters = (
    height: string | number | null,
): number | null => {
    if (height === null) {
        return null;
    }

    const heightInMm =
        typeof height === 'string' ? Number.parseFloat(height) : height;

    return Number.isNaN(heightInMm)
        ? null
        : Math.round((heightInMm / 10) * 10) / 10;
};

export { convertHeightToCentimeters };
