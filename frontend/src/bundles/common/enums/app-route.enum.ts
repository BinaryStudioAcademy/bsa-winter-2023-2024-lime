const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    SUBSCRIPTION: '/subscriptions',
    SUBSCRIPTION_CHECKOUT: '/subscriptions-checkout',
    NOT_FOUND: '*',
} as const;

export { AppRoute };
