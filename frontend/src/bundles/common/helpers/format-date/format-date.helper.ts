import { format, isToday, isYesterday } from 'date-fns';

const formatDate = (date: Date): string => {
    if (isToday(date)) {
        return 'Today';
    } else if (isYesterday(date)) {
        return 'Yesterday';
    } else {
        return format(date, 'MMMM dd, yyyy');
    }
};

export { formatDate };
