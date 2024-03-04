const getTimeFromDate = (date: Date | null): string => {
    const dateTime = date ? new Date(date) : new Date();

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const hoursString = hours >= 10 ? String(hours) : `0${hours}`;
    const minutesString = minutes >= 10 ? String(minutes) : `0${minutes}`;

    return `${hoursString}:${minutesString}`;
};

export { getTimeFromDate };
