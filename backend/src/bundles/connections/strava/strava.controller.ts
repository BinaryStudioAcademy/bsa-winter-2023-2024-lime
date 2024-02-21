import axios from 'axios';
import { HttpCode } from 'shared';

import { type OAuthClient } from '~/bundles/connections/oauth/oauth.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { StravaPaths } from './enums/enums.js';
import { type StravaService } from './strava.service.js';

/*
  Strava OAuth Url to open a prompt window for auth (replace client_id):
  https://www.strava.com/oauth/authorize?client_id=REPLACE_WITH_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3001/api/v1/connections/exchange-token&approval_prompt=force&scope=read,activity:read_all
*/

class StravaController extends BaseController {
    private stravaService: StravaService;

    private clientConfig: OAuthClient;

    public constructor(
        logger: Logger,
        stravaService: StravaService,
        clientCnfig: OAuthClient,
    ) {
        super(logger, ApiPath.CONNECTIONS);

        this.stravaService = stravaService;
        this.clientConfig = clientCnfig;

        this.addRoute({
            path: StravaPaths.REDIRECT_URI,
            method: 'GET',
            handler: (options) =>
                this.exchangeToken(
                    options as ApiHandlerOptions<{
                        query: { code: string };
                    }>,
                ),
        });
    }

    private async exchangeToken(
        options: ApiHandlerOptions<{
            query: { code: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        const config = {
            client_id: this.clientConfig.CLIENT_ID,
            client_secret: this.clientConfig.CLIENT_SECRET,
            code: options.query.code,
            grant_type: 'authorization_code',
        };

        const oAuthResponse = await axios.post(
            StravaPaths.TOKEN_EXCHANGE,
            config,
        );

        // const oAuthInfo = this.stravaService.create(oAuthResponse.data);

        return {
            status: HttpCode.OK,
            payload: oAuthResponse.data,
        };
    }
}

export { StravaController };
