import fastifyPlugin from 'fastify-plugin';
import { UserValidationMessage } from 'shared';

import { PluginName } from '~/common/enums/enums.js';
import {
    extractTokenFromHeaders,
} from '~/common/helpers/helpers.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { type AuthPluginOptions } from './types/types.js';

const authPlugin = fastifyPlugin(
    (fastify, { jwtService, whitelistedRoutes }: AuthPluginOptions, done) => {
        fastify.decorateRequest('user', null);

        fastify.addHook('preHandler', async (request) => {
            if (whitelistedRoutes.includes(request.routeOptions.url)) {
                return;
            }
            const token = extractTokenFromHeaders(request);

            if (!token) {
                throw new HttpError({
                    status: HttpCode.UNAUTHORIZED,
                    message: UserValidationMessage.TOKEN_REQUIRE,
                });
            }
            try {
                request.user = await jwtService.verifyToken(token);
            } catch {
                throw new HttpError({
                    status: HttpCode.UNAUTHORIZED,
                    message: UserValidationMessage.TOKEN_INVALID,
                });
            }
        });
        done();
    },
    { name: PluginName.AUTH },
);

export { authPlugin };
