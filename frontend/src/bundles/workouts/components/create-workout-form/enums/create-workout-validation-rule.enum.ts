const CreateWorkoutValidationRule = {
    HEART_RATE: {
        MIN_VALUE: 10,
        MAX_VALUE: 250,
    },
    SPEED: {
        MIN_VALUE: 0,
        MAX_VALUE: 1000,
    },
} as const;

export { CreateWorkoutValidationRule };
