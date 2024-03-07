import { type File } from 'fastify-multer/lib/interfaces.js';

declare module 'fastify' {
    interface FastifyRequest {
        file: File | null;
    }
}
