import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { HttpCode } from '~/common/http/enums/enums.js';
import { type Logger } from '~/common/logger/types/types.js';

import { type SubscriptionService } from './subscription.service.js';

type OptionsTypeSubscribe = {
    planId: number;
    userId: number;
    priceToken: string;
    customerToken: string;
};

type OptionsTypeCancelSubscribe = {
    planId: number;
    userId: number;
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
                    options as ApiHandlerOptions<{
                        body: OptionsTypeSubscribe;
                    }>,
                ),
        });

        this.addRoute({
            path: '/cancel-subscription',
            method: 'POST',
            handler: (options) =>
                this.cancelSubscribtion(
                    options as ApiHandlerOptions<{
                        body: OptionsTypeCancelSubscribe;
                    }>,
                ),
        });
    }

    private async subscribe(
        options: ApiHandlerOptions<{
            body: OptionsTypeSubscribe;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.subscriptionService.subscribe({
                planId: options.body.planId,
                userId: options.body.userId,
                priceToken: options.body.priceToken,
                customerToken: options.body.customerToken,
            }),
        };
    }

    private async cancelSubscribtion(
        options: ApiHandlerOptions<{
            body: OptionsTypeCancelSubscribe;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.subscriptionService.cancelSubscribtion({
                planId: options.body.planId,
                userId: options.body.userId,
            }),
        };
    }
}

export { SubscriptionController };
