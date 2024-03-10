const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const convertSecondsToHMS = (seconds: number): number[] => {
    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    let secondsLeft = seconds % SECONDS_IN_HOUR;

    const minutes = Math.floor(secondsLeft / SECONDS_IN_MINUTE);
    secondsLeft %= SECONDS_IN_MINUTE;

    return [hours, minutes, secondsLeft];
};

export { convertSecondsToHMS };
