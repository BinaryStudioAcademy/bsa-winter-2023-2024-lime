import { format } from 'date-fns';

const getTimeFromDate = (date: Date | null): string => {
    const dateTime = date ? new Date(date) : new Date();

    return format(dateTime, 'HH:mm');
};

export { getTimeFromDate };
