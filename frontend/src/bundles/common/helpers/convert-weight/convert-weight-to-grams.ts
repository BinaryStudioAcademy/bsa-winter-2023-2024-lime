import {
    KG_TO_GRAMS_CONVERSION_FACTOR,
    ROUNDING_FACTOR,
} from './constants/constants.js';

const convertWeightToGrams = (
    weight: string | number | null,
): number | null => {
    if (!weight) {
        return null;
    }
    const weightInKg =
        typeof weight === 'string' ? Number.parseFloat(weight) : weight;

    return Number.isNaN(weightInKg)
        ? null
        : Math.round(
              weightInKg * KG_TO_GRAMS_CONVERSION_FACTOR * ROUNDING_FACTOR,
          ) / ROUNDING_FACTOR;
};

export { convertWeightToGrams };
