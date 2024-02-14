import fastifyPlugin from 'fastify-plugin';
import { AuthApiPath, UserValidationMessage } from 'shared';

import { PluginNames } from '~/common/enums/enums.js';
import { extractTokenFromHeaders } from '~/common/helpers/helpers.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { type AuthOptions } from './types/types.js';

const authPlugin = fastifyPlugin(
    (fastify, { jwtService, apis }: AuthOptions, done) => {
        fastify.decorateRequest('user', null);

        const routes = apis.flatMap((api) =>
            api.routes.map((element) => element.path),
        );
        const excludedRoutes = [AuthApiPath.SIGN_IN, AuthApiPath.SIGN_UP];
        const filteredRoutes = routes.filter((route) =>
            excludedRoutes.some((excRoute) => route.includes(excRoute)),
        );

        fastify.addHook('preHandler', async (request) => {
            if (filteredRoutes?.includes(request.routeOptions.url)) {
                return;
            }
            const token = extractTokenFromHeaders(request);

            if (!token) {
                throw new HttpError({
                    status: HttpCode.UNAUTHORIZED,
                    message: UserValidationMessage.TOKEN_REQUIRE,
                });
            }

            const decodedToken = await jwtService.verifyToken(token);

            if (!decodedToken) {
                throw new HttpError({
                    status: HttpCode.UNAUTHORIZED,
                    message: UserValidationMessage.TOKEN_INVALID,
                });
            }

            request.user = decodedToken;
        });
        done();
    },
    { name: PluginNames.AUTH_PLUGIN },
);

export { authPlugin };
