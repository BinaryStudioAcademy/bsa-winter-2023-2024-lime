import { type FastifyRequest as OriginalFastifyRequest } from 'fastify';
import { type JWTPayload } from 'jose';

declare module 'fastify' {
    interface FastifyRequest extends OriginalFastifyRequest {
        user?: JWTPayload | null;
    }
}
