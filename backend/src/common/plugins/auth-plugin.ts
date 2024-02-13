import { type FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { UserValidationMessage } from 'shared';

import { PluginNames } from '~/common/enums/enums.js';
import { extractTokenFromHeaders } from '~/common/helpers/helpers.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { type AuthPluginOptions } from './types/types.js';

const authPlugin = fastifyPlugin(
    (fastify, { jwtService, excludedRoutes }: AuthPluginOptions, done) => {
        fastify.decorateRequest('user', null);
        fastify.addHook(
            'preHandler',
            (request: FastifyRequest, reply, next) => {
                if (excludedRoutes?.includes(request.routeOptions.url)) {
                    return next();
                }
                const token = extractTokenFromHeaders(request);

                if (!token) {
                    throw new HttpError({
                        status: HttpCode.UNAUTHORIZED,
                        message: UserValidationMessage.TOKEN_REQUIRE,
                    });
                }

                const decodedToken = jwtService.verifyToken(token);

                if (!decodedToken) {
                    throw new HttpError({
                        status: HttpCode.UNAUTHORIZED,
                        message: UserValidationMessage.TOKEN_INVALID,
                    });
                }

                request.user = decodedToken;
            },
        );
        done();
    },
    { name: PluginNames.AUTH_PLUGIN },
);

export { authPlugin };
