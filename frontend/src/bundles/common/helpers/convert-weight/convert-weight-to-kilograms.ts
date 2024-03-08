import { KG_TO_GRAMS_FACTOR } from './constants/constants.js';

const convertWeightToKilograms = (grams: number | null): number | null => {
    if (grams) {
        return grams / KG_TO_GRAMS_FACTOR;
    }
    return null;
};

export { convertWeightToKilograms };
