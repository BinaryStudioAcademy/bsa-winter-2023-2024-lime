import { DateObject } from 'react-multi-date-picker';

const dateConverter = (date: Date): string => {
    return new DateObject(date).format('DD.MM.YYYY');
};

export { dateConverter };
