const SubscriptionValidationMessage = {
    SUBSCRIPTION_NOT_FOUND:
        'The requested subscription was not found. Reload the page and try again!',
    SUBSCRIPTION_INVALID_REQUEST:
        'Could not understand the request due to invalid syntax.',
    SUBSCRIPTION_ALREDY_IN_USE:
        'You have already purchased this product, so you does not need to update it again.',
    SUBSCRIPTION_CANNOT_BE_CANCELED:
        'Subscription cannot be cancelled due to internal server error.',
} as const;

export { SubscriptionValidationMessage };
