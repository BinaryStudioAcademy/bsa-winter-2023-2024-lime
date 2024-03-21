import {
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/enums/enums.js';
import { type Logger } from '~/common/logger/types/types.js';

import { SubscriptionPlansApiPath } from './enums/enums.js';
import { type SubscriptionPlanService } from './subscription-plan.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      SubscriptionPlan:
 *        type: object
 *        properties:
 *         id:
 *           type: integer
 *           minimum: 1
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: double
 *         bonusPointsPrice:
 *           type: number
 *           format: integer
 *         description:
 *           type: string
 *           nullable: true
 *         stripeProductId:
 *           type: string
 *         stripePriceId:
 *           type: string
 */
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
            isProtected: true,
            handler: () => this.findAll(),
        });
    }

    /**
     * @swagger
     * /api/v1/subscription-plans/:
     *    get:
     *      tags:
     *       - SubscriptionPlans
     *      description: Returns an array of subscription plans
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 properties:
     *                   items:
     *                     type: array
     *                     items:
     *                       $ref: '#/components/schemas/SubscriptionPlan'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.subscriptionPlanService.findAll(),
        };
    }
}

export { SubscriptionPlanController };
