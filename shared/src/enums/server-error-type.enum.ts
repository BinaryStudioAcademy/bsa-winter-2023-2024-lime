const ServerErrorType = {
    COMMON: 'COMMON',
    VALIDATION: 'VALIDATION',
} as const;

type ServerErrorType = typeof ServerErrorType;

export { ServerErrorType };
