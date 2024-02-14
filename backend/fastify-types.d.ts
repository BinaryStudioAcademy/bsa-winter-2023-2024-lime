import { type FastifyRequest as OriginalFastifyRequest } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest extends OriginalFastifyRequest {
        user: HERE_SUPPOSED_TO_BE_USER_DTO;
    }
}
