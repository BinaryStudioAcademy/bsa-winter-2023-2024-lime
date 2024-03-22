const KILOMETERS_TO_METERS = 1000;
const HOURS_TO_SECONDS = 3600;

const convertKMPHtoMPS = (value: number): number => {
    const mps = (value * KILOMETERS_TO_METERS) / HOURS_TO_SECONDS;
    return Number(mps.toFixed(2));
};

export { convertKMPHtoMPS };
