const AppRoute = {
    ROOT: '/',
    LOGOUT: '/logout',
    HELP: '/help',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    GOALS: '/goals',
    PASSWORD_RESET: '/reset-password/:resetToken',
    OVERVIEW: '/overview',
    WORKOUT: '/workout',
    SCHEDULE: '/schedule',
    NOT_FOUND: '*',
} as const;

export { AppRoute };
