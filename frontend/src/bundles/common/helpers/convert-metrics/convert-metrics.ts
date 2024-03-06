import {
    CM_TO_MM_CONVERSION_FACTOR,
    KG_TO_GRAMS_CONVERSION_FACTOR,
    MM_TO_CM_CONVERSION_FACTOR,
    ROUNDING_FACTOR,
} from './constants/constants.js';

const convertToTargetUnit = (
    value: string | number | null,
    conversionFactor: number,
    roundingFactor: number = 1,
): number | null => {
    if (!value) {
        return null;
    }

    const numericValue =
        typeof value === 'string' ? Number.parseFloat(value) : value;
    return Number.isNaN(numericValue)
        ? null
        : Math.round(numericValue * conversionFactor * roundingFactor) /
                roundingFactor;
};

const convertWeightToGrams = (
    weight: string | number | null,
): number | null => {
    return convertToTargetUnit(
        weight,
        KG_TO_GRAMS_CONVERSION_FACTOR,
        ROUNDING_FACTOR,
    );
};

const convertHeightToMillimeters = (
    height: string | number | null,
): number | null => {
    return convertToTargetUnit(height, MM_TO_CM_CONVERSION_FACTOR);
};

const convertHeightToCentimeters = (
    height: string | number | null,
): number | null => {
    return convertToTargetUnit(
        height,
        CM_TO_MM_CONVERSION_FACTOR,
        MM_TO_CM_CONVERSION_FACTOR,
    );
};

export {
    convertHeightToCentimeters,
    convertHeightToMillimeters,
    convertWeightToGrams,
};
