import fastifyPlugin from 'fastify-plugin';
import { UserValidationMessage } from 'shared';

import { userService } from '~/bundles/users/users.js';
import { SERVED_PAGE_PATH } from '~/common/constants/constants.js';
import { PluginName } from '~/common/enums/enums.js';
import { extractTokenFromHeaders } from '~/common/helpers/helpers.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { type AuthPluginOptions } from './types/types.js';

const authPlugin = fastifyPlugin(
    (fastify, { jwtService, protectedRoutes }: AuthPluginOptions, done) => {
        fastify.decorateRequest('user', null);
        fastify.addHook('preHandler', async (request) => {
            const isServedPagePath = request.routerPath === SERVED_PAGE_PATH;
            if (isServedPagePath) {
                return;
            }

            if (protectedRoutes.includes(request.routeOptions.url)) {
                const token = extractTokenFromHeaders(request);

                if (!token) {
                    throw new HttpError({
                        status: HttpCode.UNAUTHORIZED,
                        message: UserValidationMessage.TOKEN_REQUIRE,
                    });
                }
                try {
                    const { userId } = await jwtService.verifyToken(token);
                    const user = await userService.find({ id: userId });
                    if (!user) {
                        throw new HttpError({
                            status: HttpCode.UNAUTHORIZED,
                            message: UserValidationMessage.TOKEN_INVALID,
                        });
                    }

                    request.user = user?.toObject();
                } catch {
                    throw new HttpError({
                        status: HttpCode.UNAUTHORIZED,
                        message: UserValidationMessage.TOKEN_INVALID,
                    });
                }
            }
        });
        done();
    },
    { name: PluginName.AUTH },
);

export { authPlugin };
