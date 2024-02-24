import { type ApiHandlerResponse } from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/enums/enums.js';
import { type Logger } from '~/common/logger/types/types.js';

import { SubscriptionPlansApiPath } from './enums/enums.js';
import { type SubscriptionPlanService } from './subscription-plan.service.js';

class SubscriptionPlanController extends BaseController {
    private subscriptionPlanService: SubscriptionPlanService;

    public constructor(
        logger: Logger,
        subscriptionPlanService: SubscriptionPlanService,
    ) {
        super(logger, ApiPath.SUBSCRIPTIONS_PLANS);

        this.subscriptionPlanService = subscriptionPlanService;

        this.addRoute({
            path: SubscriptionPlansApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });
    }

    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.subscriptionPlanService.findAll(),
        };
    }
}

export { SubscriptionPlanController };
