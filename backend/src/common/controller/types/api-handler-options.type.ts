import { type UserAuthResponseDto } from '~/bundles/users/users.js';

type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
    user?: UserAuthResponseDto;
    origin?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    user: T['user'];
    origin: T['origin'];
};

export { type ApiHandlerOptions };
