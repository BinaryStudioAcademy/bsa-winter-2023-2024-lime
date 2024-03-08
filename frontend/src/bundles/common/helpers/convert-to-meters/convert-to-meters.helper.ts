const KILOMETERS_TO_METERS = 1000;

const convertToMeters = (value: number): number => {
    return value * KILOMETERS_TO_METERS;
};

export { convertToMeters };
