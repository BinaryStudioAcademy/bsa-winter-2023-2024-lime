import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import {
    type OAuthService,
    ConnectionsOAuthPath,
    HttpCode,
} from '../oauth/oauth.js';
import { type UserAuthResponseDto } from '../users/users.js';

class ConnectionController extends BaseController {
    private oAuthService: OAuthService;

    public constructor(logger: Logger, oAuthService: OAuthService) {
        super(logger, ApiPath.CONNECTIONS);

        this.oAuthService = oAuthService;

        this.addRoute({
            path: ConnectionsOAuthPath.ROOT,
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
