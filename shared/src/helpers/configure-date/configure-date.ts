const configureDate = (
    dateString: string,
    timeString?: string,
): Date | null => {
    const [day, month, year] = dateString.split('/');

    if (timeString) {
        const dateObject = new Date(`${year}-${month}-${day}T${timeString}`);
        return Number.isNaN(dateObject.getDay()) ? null : dateObject;
    }

    const dateObject = new Date(`${year}-${month}-${day}`);
    return Number.isNaN(dateObject.getDay()) ? null : dateObject;
};

export { configureDate };
