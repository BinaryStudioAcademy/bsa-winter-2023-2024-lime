import { type FastifyRequest as OriginalFastifyRequest } from 'fastify';

import { type UserAuthResponseDto } from '~/bundles/users/users.js';

declare module 'fastify' {
    interface FastifyRequest extends OriginalFastifyRequest {
        user: UserAuthResponseDto;
    }
}
