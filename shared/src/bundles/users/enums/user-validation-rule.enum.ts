const UserValidationRule = {
    EMAIL_REQUIRED: 1,
    EMAIL_MIN_LENGTH: 6,
    EMAIL_MAX_LENGTH: 320,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 12,
} as const;

export { UserValidationRule };
