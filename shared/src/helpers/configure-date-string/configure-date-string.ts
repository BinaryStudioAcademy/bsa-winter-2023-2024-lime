function configureDateString(isoString: string | null): string {
    if (!isoString) {
        return '';
    }

    const dateObject = new Date(isoString);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
}

export { configureDateString };
