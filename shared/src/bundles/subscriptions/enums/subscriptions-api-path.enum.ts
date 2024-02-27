const SubscriptionsApiPath = {
    ROOT: '/',
    SUBSCRIBE: '/subscribe',
    CURRENT_SUBSCRIPTION: '/current-subscription',
    CANCEL_SUBSCRIPTION: '/cancel-subscription',
    STRIPE_WEBHOOK: '/stripe-webhook',
} as const;

export { SubscriptionsApiPath };
