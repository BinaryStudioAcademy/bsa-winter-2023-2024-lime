import { type FastifyRequest as OriginalFastifyRequest } from 'fastify';
import { type File } from '~/common/services/file/types/types.ts';

import { type UserAuthResponseDto } from '~/bundles/users/users.js';

declare module 'fastify' {
    interface FastifyRequest extends OriginalFastifyRequest {
        user: UserAuthResponseDto;
        file: File | null;
    }
}
