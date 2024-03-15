import { differenceInYears } from 'date-fns';

const calculateAge = (dateOfBirth: string | null): number | null => {
    if (dateOfBirth) {
        const birthdate = new Date(dateOfBirth);
        const today = new Date();

        return differenceInYears(today, birthdate);
    }
    return null;
};

export { calculateAge };
