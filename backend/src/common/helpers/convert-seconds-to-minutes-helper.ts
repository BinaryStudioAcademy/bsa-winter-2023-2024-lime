const MINUTES_TO_SECONDS = 60;

const convertSecondsToMinutes = (value: number): number => {
    return value / MINUTES_TO_SECONDS;
};

export { convertSecondsToMinutes };
