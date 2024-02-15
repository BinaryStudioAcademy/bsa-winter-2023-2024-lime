import fastifyPlugin from 'fastify-plugin';
import { UserValidationMessage } from 'shared';

import { PluginName } from '~/common/enums/enums.js';
import {
    extractApiPath,
    extractTokenFromHeaders,
} from '~/common/helpers/helpers.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { type AuthPluginOptions } from './types/types.js';

const authPlugin = fastifyPlugin(
    (fastify, { jwtService, whitelistedRoutes }: AuthPluginOptions, done) => {
        fastify.decorateRequest('user', null);
        const whiteList = whitelistedRoutes.map((route) =>
            extractApiPath(route),
        ) as string[];

        fastify.addHook('preHandler', async (request) => {
            const extractedApiPath = extractApiPath(request.routeOptions.url);
            if (extractedApiPath && whiteList?.includes(extractedApiPath)) {
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
            } catch (error) {
                throw new HttpError({
                    status: HttpCode.UNAUTHORIZED,
                    message: (error as Error).message,
                });
            }
        });
        done();
    },
    { name: PluginName.AUTH },
);

export { authPlugin };
