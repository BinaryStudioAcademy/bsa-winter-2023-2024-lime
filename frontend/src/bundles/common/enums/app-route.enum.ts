const AppRoute = {
    ROOT: '/',
    LOGOUT: '/logout',
    HELP: '/help',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    OVERVIEW: '/overview',
    GOALS: '/goals',
    WORKOUT: '/workout',
    SCHEDULE: '/schedule',
    NOT_FOUND: '*',
} as const;

export { AppRoute };
