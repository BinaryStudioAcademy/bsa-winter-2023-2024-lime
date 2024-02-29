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
    PROFILE: '/profile',
    PROFILE_INFORMATION: '/profile/information',
    PROFILE_GOALS: '/profile/goals',
    PROFILE_PREFERENCES: '/profile/preferences',
    PROFILE_CONECTIONS: '/profile/conections',
    NOT_FOUND: '*',
} as const;

export { AppRoute };
