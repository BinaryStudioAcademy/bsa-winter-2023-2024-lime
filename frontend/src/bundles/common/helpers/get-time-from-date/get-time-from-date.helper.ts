import { format } from 'date-fns';

const getTimeFromDate = (
    date: Date | null,
    timeFormat: 'HH:mm' | 'HH:mm:ss',
): string => {
    const dateTime = date ? new Date(date) : new Date();

    return format(dateTime, timeFormat);
};

export { getTimeFromDate };
