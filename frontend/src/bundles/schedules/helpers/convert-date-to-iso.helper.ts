import { formatISO, parse } from 'date-fns';

const convertDateToIso = (date: string): string => {
    const formatString = 'dd/MM/yyyy HH:mm';
    const parsedDate = parse(date, formatString, new Date());
    return formatISO(parsedDate);
};

export { convertDateToIso };
