function configureTimeString(isoString: string | null): string {
    if (!isoString) {
        return '';
    }

    const dateObject = new Date(isoString);

    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export { configureTimeString };
