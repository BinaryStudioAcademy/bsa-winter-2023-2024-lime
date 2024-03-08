import { MM_TO_CM } from './constants/constants.js';

const convertHeightToMillimeters = (
    height: string | number | null,
): number | null => {
    if (!height) {
        return null;
    }
    const heightInCm =
        typeof height === 'string' ? Number.parseFloat(height) : height;

    return Number.isNaN(heightInCm) ? null : Math.round(heightInCm * MM_TO_CM);
};

export { convertHeightToMillimeters };
