const AppRoute = {
    ROOT: '/',
    LOGOUT: '/logout',
    HELP: '/help',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    PASSWORD_RESET: '/reset-password/:resetToken',
    OVERVIEW: '/overview',
    GOALS: '/goals',
    WORKOUT: '/workout',
    WORKOUT_$ID: '/workout/:id',
    SCHEDULE: '/schedule',
    NOT_FOUND: '*',
} as const;

export { AppRoute };
