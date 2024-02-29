const AppRoute = {
    ROOT: '/',
    LOGOUT: '/logout',
    HELP: '/help',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    SUBSCRIPTION: '/subscriptions',
    SUBSCRIPTION_CHECKOUT: '/subscriptions-checkout',
    PASSWORD_RESET: '/reset-password/:resetToken',
    OVERVIEW: '/overview',
    GOALS: '/goals',
    WORKOUT: '/workout',
    SCHEDULE: '/schedule',
    NOT_FOUND: '*',
    PROFILE: '/profile/settings',
} as const;

export { AppRoute };
