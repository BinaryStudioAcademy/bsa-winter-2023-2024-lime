const configureISOString = (dateString: string): string | null => {
    const [day, month, year] = dateString.split('/');
    const dateObject = new Date(`${year}-${month}-${day}`);
    return Number.isNaN(dateObject.getDay()) ? null : dateObject.toISOString();
};

export { configureISOString };
