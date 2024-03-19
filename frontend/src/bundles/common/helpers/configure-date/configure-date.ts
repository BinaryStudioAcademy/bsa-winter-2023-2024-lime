import { parse } from 'date-fns';

const configureDate = (
    dateString: string,
    timeString?: string,
): Date | null => {
    if (timeString) {
        const dateObject = parse(
            `${dateString} ${timeString}`,
            'dd/MM/yyyy HH:mm:ss',
            new Date(),
        );
        return Number.isNaN(dateObject.getDay()) ? null : dateObject;
    }

    const dateObject = parse(dateString, 'dd/MM/yyyy', new Date());
    return Number.isNaN(dateObject.getDay()) ? null : dateObject;
};

export { configureDate };
