const METERS_IN_KILOMETER = 1000;

const metersToKilometers = (distance: number): number => {
    return Number((distance / METERS_IN_KILOMETER).toFixed(3));
};

export { metersToKilometers };
