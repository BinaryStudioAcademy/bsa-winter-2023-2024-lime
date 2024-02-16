const PasswordResetValidationMessage = {
    USER_NOT_FOUND: 'User not found',
    TOKEN_EXPIRED: 'The password reset token you used has expired',
    SAME_PASSWORD: 'The password should differ from previous',
    SERVER_ERROR: 'Something went wrong',
} as const;

export { PasswordResetValidationMessage };
