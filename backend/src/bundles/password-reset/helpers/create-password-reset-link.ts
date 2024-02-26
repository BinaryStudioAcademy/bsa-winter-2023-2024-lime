type UserData = {
    origin: string;
    token: string;
};

const createPasswordResetLink = ({ origin, token }: UserData): string => {
    return `${origin}/reset-password/${token}`;
};

export { createPasswordResetLink };
