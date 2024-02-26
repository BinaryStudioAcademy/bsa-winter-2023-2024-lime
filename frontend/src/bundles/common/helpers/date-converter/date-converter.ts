import { DateObject } from 'react-multi-date-picker';

const dateConverter = (date: string): string => {
    const convertedDate = new DateObject(date);

    return convertedDate.format('dddd, MMMM DD | HH:mm A');
};

export { dateConverter };
