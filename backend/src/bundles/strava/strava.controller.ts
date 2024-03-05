import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/types/types.js';

import { ApiPath, StravaPath } from './enums/enums.js';
import { type StravaService } from './strava.service.js';
import {
    type StravaWebhookQuery,
    type StravaWebhookResponseDto,
} from './types/types.js';

class StravaController extends BaseController {
    private stravaService: StravaService;
    public constructor(logger: Logger, stravaService: StravaService) {
        super(logger, ApiPath.STRAVA);
        this.stravaService = stravaService;

        this.addRoute({
            path: StravaPath.WEBHOOK,
            method: 'GET',
            handler: (options) =>
                this.setupWebHook(
                    options as ApiHandlerOptions<{
                        query: StravaWebhookQuery;
                    }>,
                ),
        });
        this.addRoute({
            path: StravaPath.WEBHOOK,
            method: 'POST',
            handler: (options) =>
                this.webHookListener(
                    options as ApiHandlerOptions<{
                        body: StravaWebhookResponseDto;
                    }>,
                ),
        });
    }

    private setupWebHook(
        options: ApiHandlerOptions<{
            query: StravaWebhookQuery;
        }>,
    ): ApiHandlerResponse {
        const challenge = options.query['hub.challenge'];
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: { 'hub.challenge': challenge },
        };
    }
    private async webHookListener(
        options: ApiHandlerOptions<{
            body: StravaWebhookResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.stravaService.setWebhookData(options.body),
        };
    }
}

export { StravaController };
