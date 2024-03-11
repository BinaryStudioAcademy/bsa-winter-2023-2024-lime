import { format, isThisWeek,isThisYear, isToday } from 'date-fns';

const formatChatLinkDate = (date: Date): string => {
    if (isToday(date)) {
        return format(date, 'HH:mm');
    } else if (isThisWeek(date)) {
        return format(date, 'EEE');
    } else if (isThisYear(date)) {
        return format(date, 'MMM dd');
    } else {
        return format(date, 'MMMM dd, yyyy');
    }
};

export { formatChatLinkDate };
