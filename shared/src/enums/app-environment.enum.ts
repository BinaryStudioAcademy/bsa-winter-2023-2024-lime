const AppEnvironment = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
} as const;

type AppEnvironment = typeof AppEnvironment;

export { AppEnvironment };
