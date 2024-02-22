import { type UserAuthResponseDto } from 'shared';

type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
    user?: UserAuthResponseDto | null;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    user: T['user'];
};

export { type ApiHandlerOptions };
