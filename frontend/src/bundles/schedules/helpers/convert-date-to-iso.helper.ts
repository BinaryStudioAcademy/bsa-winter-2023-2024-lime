import { formatISO, parse } from 'date-fns';

const convertDateToIso = (date: string, format: string): string => {
    const parsedDate = parse(date, format, new Date());
    return formatISO(parsedDate);
};

export { convertDateToIso };
