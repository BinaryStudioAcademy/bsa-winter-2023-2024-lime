import { format, isThisWeek, isToday } from 'date-fns';

const formatChatMessageDate = (date: string | null): string => {
    if (!date) {
        return '';
    }

    const formatedDate = new Date(date);
    if (isToday(formatedDate)) {
        return format(formatedDate, 'HH:mm');
    } else if (isThisWeek(formatedDate)) {
        return format(formatedDate, 'EEE | HH:mm');
    } else {
        return format(formatedDate, 'MMM dd');
    }
};

export { formatChatMessageDate };
