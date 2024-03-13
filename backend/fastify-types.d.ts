import { type FastifyRequest as OriginalFastifyRequest } from 'fastify';
import { type Server as SocketServer } from 'socket.io';
import { type File } from '~/common/services/file/types/types.ts';

import { type UserAuthResponseDto } from '~/bundles/users/users.js';

declare module 'fastify' {
    interface FastifyRequest extends OriginalFastifyRequest {
        user: UserAuthResponseDto;
        io: SocketServer;
        file: File | null;
    }
}
