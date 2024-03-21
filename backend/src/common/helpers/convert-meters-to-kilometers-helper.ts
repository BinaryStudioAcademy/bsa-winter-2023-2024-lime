const METERS_TO_KILOMETERS = 1000;

const convertMetersToKilometers = (value: number): number => {
    return value / METERS_TO_KILOMETERS;
};

export { convertMetersToKilometers };
