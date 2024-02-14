const getFormatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    } as Intl.DateTimeFormatOptions;

    return date.toLocaleString('en-US', options);
};

export { getFormatDate };
