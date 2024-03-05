const AppRoute = {
    ROOT: '/',
    HELP: '/help',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    GOALS: '/goals',
    PASSWORD_RESET: '/reset-password/:resetToken',
    OVERVIEW: '/overview',
    WORKOUT: '/workout',
    SCHEDULE: '/schedule',
    PROFILE_INFORMATION: '/profile/information',
    PROFILE_GOALS: '/profile/goals',
    PROFILE_PREFERENCES: '/profile/preferences',
    PROFILE_CONECTIONS: '/profile/conections',
    PROFILE_SUBSCRIPTION: '/profile/subscriptions',
    PROFILE_SUBSCRIPTION_CHECKOUT: '/profile/subscriptions-checkout',
    NOT_FOUND: '*',
    PROFILE: '/profile/settings',
} as const;

export { AppRoute };
