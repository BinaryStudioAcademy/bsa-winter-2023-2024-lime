import { type FastifyRequest } from 'fastify';

const extractTokenFromHeaders = (
    request: FastifyRequest,
): string | undefined => {
    const authHeader = request.headers.authorization;
    return authHeader?.split(' ')[1];
};

export { extractTokenFromHeaders };
