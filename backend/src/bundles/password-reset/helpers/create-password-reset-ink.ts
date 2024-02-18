type UserData = {
    userId: number | string;
    token: string;
};

const createPasswordResetLink = ({ userId, token }: UserData): string => {
    return `http://localhost:3000/reset-password/${userId}/${token}`;
};

export { createPasswordResetLink };
