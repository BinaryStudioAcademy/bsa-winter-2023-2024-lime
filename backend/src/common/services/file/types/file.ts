import { type FileUploaded } from '~/common/controller/types/file-request.type.js';

declare module 'fastify' {
    interface FastifyRequest {
        file: FileUploaded | null;
    }
}
