type PasswordResetRequestDto = {
    id: number;
    token: string;
    password: string;
    passwordConfirm: string;
};

export { type PasswordResetRequestDto };
