import { format } from 'date-fns';

const formatScheduleTime = (date: Date): string => {
    return `At ${format(date, 'H:m')}`;
};

export { formatScheduleTime };
