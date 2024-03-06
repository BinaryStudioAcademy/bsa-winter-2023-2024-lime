import { MM_TO_CM_CONVERSION_FACTOR } from './constants/constants.js';

const convertHeightToMillimeters = (
    height: string | number | null,
): number | null => {
    if (height === null) {
        return null;
    }

    const heightInCm =
        typeof height === 'string' ? Number.parseFloat(height) : height;

    return Number.isNaN(heightInCm)
        ? null
        : Math.round(heightInCm * MM_TO_CM_CONVERSION_FACTOR);
};

export { convertHeightToMillimeters };
