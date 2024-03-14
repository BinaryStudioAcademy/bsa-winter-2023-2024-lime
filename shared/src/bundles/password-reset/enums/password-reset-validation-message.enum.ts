const PasswordResetValidationMessage = {
    USER_NOT_FOUND: 'User not found',
    TOKEN_EXPIRED: 'The password reset token you used has expired',
    SAME_PASSWORD: 'The password should differ from the previous one',
    SERVER_ERROR: 'Something went wrong',
    EMAIL_NOT_SENT: 'Something went wrong. Email has not sent',
    PASSWORDS_NOT_EQUAL: 'Passwords are not equal',
    PASSWORD_NOT_CHANGED: 'Password cannot be changed',
    USER_OAUTH: 'Use OAuth to sign in',
} as const;

export { PasswordResetValidationMessage };
