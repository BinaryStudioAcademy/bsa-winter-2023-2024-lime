const UserValidationRule = {
    EMAIL: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 320,
        LOCAL_MIN_LENGTH: 1,
        LOCAL_MAX_LENGTH: 64,
        DOMAIN_MIN_LENGTH: 4,
        DOMAIN_MAX_LENGTH: 254,
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 12,
    },
} as const;

export { UserValidationRule };
