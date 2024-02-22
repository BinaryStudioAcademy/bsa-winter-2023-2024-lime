import { type FastifyRequest as OriginalFastifyRequest } from 'fastify';
import { type UserAuthResponseDto } from 'shared';

declare module 'fastify' {
    interface FastifyRequest extends OriginalFastifyRequest {
        user: UserAuthResponseDto;
    }
}
