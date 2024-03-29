import {
    type FastifyReply,
    type FastifyRequest,
    type preHandlerHookHandler,
} from 'fastify';

import { type HttpMethod } from '~/common/http/http.js';
import { type ValidationSchema } from '~/common/types/types.js';

type ServerAppRouteParameters = {
    path: string;
    method: HttpMethod;
    handler: (
        request: FastifyRequest,
        reply: FastifyReply,
    ) => Promise<void> | void;
    preHandler?: preHandlerHookHandler;
    isProtected?: boolean;
    validation?: {
        body?: ValidationSchema;
        query?: ValidationSchema;
        params?: ValidationSchema;
    };
};

export { type ServerAppRouteParameters };
