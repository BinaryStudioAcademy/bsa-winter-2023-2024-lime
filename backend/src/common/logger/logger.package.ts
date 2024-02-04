import pino, { type Logger as TLogger } from 'pino';
import pretty from 'pino-pretty';

import { type ILogger } from './interfaces/interfaces.js';

class Logger implements ILogger {
    private logger: TLogger;

    public constructor() {
        this.logger = pino(pretty());

        this.logger.info('Logger is created…');
    }

    public debug(
        message: string,
        parameters: Record<string, unknown> = {},
    ): ReturnType<ILogger['debug']> {
        this.logger.debug(parameters, message);
    }

    public error(
        message: string,
        parameters: Record<string, unknown> = {},
    ): ReturnType<ILogger['error']> {
        this.logger.error(parameters, message);
    }

    public info(
        message: string,
        parameters: Record<string, unknown> = {},
    ): ReturnType<ILogger['info']> {
        this.logger.info(parameters, message);
    }

    public warn(
        message: string,
        parameters: Record<string, unknown> = {},
    ): ReturnType<ILogger['warn']> {
        this.logger.warn(parameters, message);
    }
}

export { Logger };
