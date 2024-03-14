const AppRoute = {
    ROOT: '/',
    HELP: '/help',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    PASSWORD_RESET: '/reset-password/:resetToken',
    OVERVIEW: '/overview',
    GOALS: '/goals',
    WORKOUT: '/workout',
    WORKOUT_$ID: '/workout/:id',
    SCHEDULE: '/schedule',
    PROFILE_INFORMATION: '/profile/information',
    PROFILE_GOALS: '/profile/goals',
    PROFILE_PREFERENCES: '/profile/preferences',
    PROFILE_CONNECTIONS: '/profile/connections',
    PROFILE_SUBSCRIPTION: '/profile/subscriptions',
    PROFILE_SUBSCRIPTION_CHECKOUT: '/profile/subscriptions-checkout',
    NOT_FOUND: '*',
    PROFILE: '/profile/settings',
    PROFILE_PUBLIC: '/profile/public',
    FRIENDS: '/friends',
} as const;

export { AppRoute };
