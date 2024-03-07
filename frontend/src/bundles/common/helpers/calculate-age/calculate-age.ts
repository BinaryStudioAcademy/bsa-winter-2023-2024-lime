const calculateAge = (dateOfBirth: string | null): number | null => {
    if (dateOfBirth) {
        const birthdate = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthdate.getDate())
        ) {
            age--;
        }

        return age;
    }
    return null;
};

export { calculateAge };
