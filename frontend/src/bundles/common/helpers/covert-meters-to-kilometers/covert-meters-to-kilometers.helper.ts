const METERS_TO_KILOMETERS = 1 / 1000;

const convertMetersToKilometers = (value: number | null): number | null => {
    if (!value) {
        return null;
    }
    return value * METERS_TO_KILOMETERS;
};

export { convertMetersToKilometers };
