import { type UserAuthResponseDto } from '~/bundles/users/users.js';
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
            path: '/current',
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: SubscriptionsApiPath.SUBSCRIBE,
            method: 'POST',
            isProtected: true,
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
            isProtected: true,
            handler: (options) =>
                this.updateCancelSubscribtion(
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

    private async find(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.subscriptionService.find({
                userId: options.user.id,
            }),
        };
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

    private async updateCancelSubscribtion(
        options: ApiHandlerOptions<{
            body: CancelSubscriptionRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { cancelAtPeriodEnd, subscriptionToken } = options.body;

        return {
            status: HttpCode.OK,
            payload: await this.subscriptionService.updateCancelSubscribtion({
                subscriptionToken,
                cancelAtPeriodEnd,
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
