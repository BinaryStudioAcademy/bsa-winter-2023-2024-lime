import { type HttpCode } from '~/framework/http/http.js';
import { type ValueOf } from '~/types/value-of.type.js';

import { ApplicationError } from '../application-error/application-error.exception.js';

type Constructor = {
    message: string;
    status: ValueOf<typeof HttpCode>;
    cause?: unknown;
};

class HttpError extends ApplicationError {
    public status: ValueOf<typeof HttpCode>;

    public constructor({ message, cause, status }: Constructor) {
        super({
            message,
            cause,
        });

        this.status = status;
    }
}

export { HttpError };
