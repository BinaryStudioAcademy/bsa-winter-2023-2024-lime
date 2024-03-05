import { type UserAuthResponseDto } from '~/bundles/users/users.js';

type DefaultApiHandlerOptions = {
    body?: unknown;
    file?: unknown;
    query?: unknown;
    params?: unknown;
    user?: UserAuthResponseDto | null;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    file: T['file'];
    query: T['query'];
    params: T['params'];
    user: T['user'];
};

export { type ApiHandlerOptions };
