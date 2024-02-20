import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { HttpCode } from '~/common/http/enums/enums.js';
import { type Logger } from '~/common/logger/types/types.js';

import { type SubscriptionService } from './subscription.service.js';

type OptionsType = {
    planId: number;
    userId: number;
    priceToken: string;
};

class SubscriptionController extends BaseController {
    private subscriptionService: SubscriptionService;

    public constructor(
        logger: Logger,
        subscriptionService: SubscriptionService,
    ) {
        super(logger, '/subscriptions');

        this.subscriptionService = subscriptionService;

        this.addRoute({
            path: '/subscribe',
            method: 'POST',
            handler: (options) =>
                this.subscribe(
                    options as ApiHandlerOptions<{ body: OptionsType }>,
                ),
        });
    }

    private async subscribe(
        options: ApiHandlerOptions<{
            body: OptionsType;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.subscriptionService.subscribe({
                planId: options.body.planId,
                userId: options.body.userId,
                priceToken: options.body.priceToken,
            }),
        };
    }
}

export { SubscriptionController };
