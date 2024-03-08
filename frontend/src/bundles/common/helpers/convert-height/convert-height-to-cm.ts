import { MM_TO_CM_FACTOR } from './constants/constants.js';

const convertHeightToCentimeters = (
    height: string | number | null,
): number | null => {
    if (!height) {
        return null;
    }
    const heightInMm =
        typeof height === 'string' ? Number.parseFloat(height) : height;

    return Number.isNaN(heightInMm)
        ? null
        : Math.round((heightInMm / MM_TO_CM_FACTOR) * MM_TO_CM_FACTOR) /
              MM_TO_CM_FACTOR;
};

export { convertHeightToCentimeters };
