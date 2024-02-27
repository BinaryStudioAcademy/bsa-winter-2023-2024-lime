const OAuthActionsPath = {
    AUTHORIZE: '/authorize',
    $PROVIDER_AUTHORIZE: '/:provider/authorize',
    DEAUTHORIZE: '/deauthorize',
    $PROVIDER_DEAUTHORIZE: '/:provider/deauthorize',
    REFRESH_TOKEN: '/refresh-token',
    EXCHANGE_TOKEN: '/exchange-token',
    $PROVIDER_EXCHANGE_TOKEN: '/:provider/exchange-token',
} as const;

export { OAuthActionsPath };
