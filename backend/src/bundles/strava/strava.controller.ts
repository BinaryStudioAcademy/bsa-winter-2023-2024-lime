import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/types/types.js';

import { ApiPath, StravaPath } from './enums/enums.js';

class StravaController extends BaseController {
    public constructor(logger: Logger) {
        super(logger, ApiPath.STRAVA);

        this.addRoute({
            path: StravaPath.WEBHOOK,
            method: 'GET',
            handler: (options) => this.setupWebHook(
                options as ApiHandlerOptions<{
                    query: Record<string, unknown>
                }>
            )
        });
        this.addRoute({
            path: StravaPath.WEBHOOK,
            method: 'POST',
            handler: (options) => this.webHookListener(
                options as ApiHandlerOptions<{
                    query: Record<string, unknown>
                }>
            )
        });
    }

    private async setupWebHook(
        options: ApiHandlerOptions<{
            query: Record<string, unknown>
        }>
    ): Promise<ApiHandlerResponse> {

        console.log(options.query);
        console.log(options.query['hub.challenge']);
        const challenge = options.query['hub.challenge'];
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: { 'hub.challenge': challenge }
        };
    }
    private async webHookListener(
        options: ApiHandlerOptions<{
            query: Record<string, unknown>
        }>
    ): Promise<ApiHandlerResponse> {
        console.log('options.bodydfsdfsdfdsfdsf', options.body);
        console.log(options.query);
        console.log(options.query['hub.challenge']);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: 'done'
        };
    }
}

export { StravaController };
