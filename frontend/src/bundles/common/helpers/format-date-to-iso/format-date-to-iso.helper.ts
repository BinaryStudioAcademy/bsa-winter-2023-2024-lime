import { formatISO, parse } from 'date-fns';

const formatDateToIso = (
    date: string,
    format: string = 'yyyy/MM/dd',
): string => {
    const parsedDate = parse(date, format, new Date());
    return formatISO(parsedDate);
};

export { formatDateToIso };
