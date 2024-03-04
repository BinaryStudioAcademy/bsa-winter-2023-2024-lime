import { DateObject } from 'react-multi-date-picker';

const DateFormat = {
    FULL_DAY: 'dddd, MMMM DD | HH:mm A',
} as const;

const formatDate = (date: string): string => {
    const convertedDate = new DateObject(date);

    return convertedDate.format(DateFormat.FULL_DAY);
};

export { formatDate };
