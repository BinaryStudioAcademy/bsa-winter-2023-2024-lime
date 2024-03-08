import { KG_TO_GRAMS } from './constants/constants.js';

const convertWeightToKilograms = (grams: number | null): number | null => {
    if (grams) {
        return grams / KG_TO_GRAMS;
    }
    return null;
};

export { convertWeightToKilograms };
