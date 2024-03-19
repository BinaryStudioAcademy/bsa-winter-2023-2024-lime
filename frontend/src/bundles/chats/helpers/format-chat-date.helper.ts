import { format, isThisWeek, isThisYear, isToday } from 'date-fns';

const formatChatDate = (date: string | null, isMessage: boolean): string => {
    if (!date) {
        return '';
    }

    const formatedDate = new Date(date);
    if (isToday(formatedDate)) {
        return format(formatedDate, 'HH:mm');
    } else if (isThisWeek(formatedDate)) {
        return isMessage
            ? format(formatedDate, 'EEE')
            : format(formatedDate, 'EEE | HH:mm');
    } else if (isThisYear(formatedDate)) {
        return format(formatedDate, 'MMM dd');
    } else {
        return format(formatedDate, 'MMMM dd, yyyy');
    }
};

export { formatChatDate };
