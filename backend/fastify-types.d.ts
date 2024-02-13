import { type FastifyRequest as OriginalFastifyRequest } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest extends OriginalFastifyRequest {
        user?: string | object;
    }
}
