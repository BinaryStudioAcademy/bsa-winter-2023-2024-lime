type LogFunction = (
    message: string,
    parameters?: Record<string, unknown>,
) => void;

interface ILogger {
    info: LogFunction;
    warn: LogFunction;
    error: LogFunction;
    debug: LogFunction;
}

export { type ILogger };
