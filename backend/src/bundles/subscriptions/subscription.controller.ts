import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/enums/enums.js';
import { type Logger } from '~/common/logger/types/types.js';

import { SubscriptionsApiPath } from './enums/enums.js';
import { type SubscriptionService } from './subscription.service.js';
import {
    type CancelSubscriptionRequestDto,
    type SubscribeRequestDto,
} from './types/types.js';

class SubscriptionController extends BaseController {
    private subscriptionService: SubscriptionService;

    public constructor(
        logger: Logger,
        subscriptionService: SubscriptionService,
    ) {
        super(logger, ApiPath.SUBSCRIPTIONS);

        this.subscriptionService = subscriptionService;

        this.addRoute({
            path: SubscriptionsApiPath.SUBSCRIBE,
            method: 'POST',
            handler: (options) =>
                this.subscribe(
                    options as ApiHandlerOptions<{
                        body: SubscribeRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: SubscriptionsApiPath.CANCEL_SUBSCRIPTION,
            method: 'POST',
            handler: (options) =>
                this.cancelSubscribtion(
                    options as ApiHandlerOptions<{
                        body: CancelSubscriptionRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: SubscriptionsApiPath.WEBHOOK,
            method: 'POST',
            handler: (options) => {
                return this.webHooksListener(
                    options as ApiHandlerOptions<{
                        body: unknown;
                    }>,
                );
            },
        });
    }

    private async subscribe(
        options: ApiHandlerOptions<{
            body: SubscribeRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.subscriptionService.subscribe({
                ...options.body,
            }),
        };
    }

    private async cancelSubscribtion(
        options: ApiHandlerOptions<{
            body: CancelSubscriptionRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.subscriptionService.cancelSubscribtion({
                userId: options.body.userId,
            }),
        };
    }

    private async webHooksListener(
        options: ApiHandlerOptions<{
            body: unknown;
        }>,
    ): Promise<ApiHandlerResponse> {
        const body = options.body;

        return {
            status: HttpCode.OK,
            payload: await this.subscriptionService.webHooksListener({
                body,
            }),
        };
    }
}

export { SubscriptionController };
