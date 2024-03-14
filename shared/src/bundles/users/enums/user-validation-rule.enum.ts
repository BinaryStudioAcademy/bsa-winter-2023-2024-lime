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
    FULLNAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 60,
    },
    NICKNAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 30,
    },
    WEIGHT: {
        MIN_VALUE: 0,
        MAX_VALUE: 300,
    },
    HEIGHT: {
        MIN_VALUE: 0,
        MAX_VALUE: 300,
    },
    LOCATION: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 300,
    },
} as const;

export { UserValidationRule };
