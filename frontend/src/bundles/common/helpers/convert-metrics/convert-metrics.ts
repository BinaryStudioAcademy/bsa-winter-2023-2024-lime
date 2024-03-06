import {
    CM_TO_MM_CONVERSION_FACTOR,
    KG_TO_GRAMS_CONVERSION_FACTOR,
    MM_TO_CM_CONVERSION_FACTOR,
    ROUNDING_FACTOR,
} from './constants/constants.js';

const convertToTargetUnit = (
    stringValue: string | number | null,
    conversionFactor: number,
    roundFactor: number = 1,
): number | null => {
    if (!stringValue) {
        return null;
    }

    const value =
        typeof stringValue === 'string'
            ? Number.parseFloat(stringValue)
            : stringValue;
    return Number.isNaN(value)
        ? null
        : Math.round(value * conversionFactor * roundFactor) / roundFactor;
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
