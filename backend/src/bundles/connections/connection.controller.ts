import { type OAuthService, HttpCode } from '~/bundles/oauth/oauth.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { ConnectionsPath } from './enums/enums.js';

class ConnectionController extends BaseController {
    private oAuthService: OAuthService;

    public constructor(logger: Logger, oAuthService: OAuthService) {
        super(logger, ApiPath.CONNECTIONS);

        this.oAuthService = oAuthService;

        this.addRoute({
            path: ConnectionsPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getUserConnections(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    private async getUserConnections(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.oAuthService.findMany({
                userId: options.user.id,
            }),
        };
    }
}

export { ConnectionController };
