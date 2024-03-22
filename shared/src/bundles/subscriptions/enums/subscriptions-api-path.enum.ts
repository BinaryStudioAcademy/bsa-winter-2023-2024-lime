const SubscriptionsApiPath = {
    ROOT: '/',
    SUBSCRIBE: '/subscribe',
    CURRENT_SUBSCRIPTION: '/current-subscription',
    CANCEL_SUBSCRIPTION: '/cancel-subscription',
    SUBSCRIBE_TRIAL: '/subscribe-trial',
    UPDATE_TRIAL: '/update-trial',
    STRIPE_WEBHOOK: '/stripe-webhook',
} as const;

export { SubscriptionsApiPath };
