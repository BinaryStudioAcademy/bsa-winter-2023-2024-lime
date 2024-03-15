
const convertDateToIso = (date: string): string | null => {
    const [datePart, timePart] = date.split(' ');
    if (datePart && timePart) {
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);

        return year && month ? new Date(year, month - 1, day, hours, minutes).toISOString() : null;
    }
    return null;
};

export { convertDateToIso };
