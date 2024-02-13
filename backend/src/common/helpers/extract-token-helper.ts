import { type FastifyRequest } from 'fastify';

const extractTokenFromHeaders = (request: FastifyRequest): string | null => {
    const authHeader = request.headers.authorization;
    return authHeader?.split(' ')[1] || null;
};

export { extractTokenFromHeaders };
