import { type FastifyRequest } from 'fastify';

const extractTokenFromHeaders = (
    request: FastifyRequest,
): string | undefined => {
    const [, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
};

export { extractTokenFromHeaders };
