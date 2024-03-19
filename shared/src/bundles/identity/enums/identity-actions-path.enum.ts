const IdentityActionsPath = {
    AUTHORIZE: '/authorize',
    $PROVIDER_AUTHORIZE: '/:provider/authorize',
    $PROVIDER_EXCHANGE_TOKEN: '/:provider/exchange-token',
    EXCHANGE_TOKEN: '/exchange-token',
} as const;

export { IdentityActionsPath };
