import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';

const formatScheduleDay = (date: Date): string => {
    if (isToday(date)) {
        return 'Today';
    } else if (isTomorrow(date)) {
        return 'Tomorrow';
    } else if (isThisWeek(date)) {
        return format(date, 'EEEE');
    } else {
        return format(date, 'MMMM dd, yyyy');
    }
};

export { formatScheduleDay };
