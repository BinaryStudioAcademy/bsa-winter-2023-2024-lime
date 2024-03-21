import { format } from 'date-fns';

const DEFAULT_CALENDAR_VALUE = {
    date: [format(new Date(), 'yyyy/MM/dd')],
};

export { DEFAULT_CALENDAR_VALUE };
