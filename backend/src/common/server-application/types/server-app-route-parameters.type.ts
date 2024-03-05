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
    preHandler: preHandlerHookHandler;
    handler: (
        request: FastifyRequest,
        reply: FastifyReply,
    ) => Promise<void> | void;
    isProtected?: boolean;
    validation?: {
        body?: ValidationSchema;
    };
};

export { type ServerAppRouteParameters };
