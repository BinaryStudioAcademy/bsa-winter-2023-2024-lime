import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
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
    type WebhookBody,
} from './types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Subscription:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          planId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          stripeSubscriptionId:
 *            type: string
 *            format: string
 *          status:
 *            type: string
 *            enum:
 *              - incomplete
 *              - incomplete_expired
 *              - active
 *              - past_due
 *              - canceled
 *              - unpaid
 *              - trialing
 *              - paused
 *          isCanceled:
 *            type: boolean
 *            format: boolean
 *          expiresAt:
 *            type: string
 *            format: date
 *          subscriptionPlanName:
 *            type: string
 *            nullable: true
 *          subscriptionPlanPrice:
 *            type: string
 *            nullable: true
 *          subscriptionPlanDescription:
 *            type: string
 *            nullable: true
 */
class SubscriptionController extends BaseController {
    private subscriptionService: SubscriptionService;

    public constructor(
        logger: Logger,
        subscriptionService: SubscriptionService,
    ) {
        super(logger, ApiPath.SUBSCRIPTIONS);

        this.subscriptionService = subscriptionService;

        this.addRoute({
            path: SubscriptionsApiPath.CURRENT_SUBSCRIPTION,
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
                        user: UserAuthResponseDto;
                        body: SubscribeRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: SubscriptionsApiPath.CANCEL_SUBSCRIPTION,
            method: 'PATCH',
            isProtected: true,
            handler: (options) =>
                this.updateCancelSubscribtion(
                    options as ApiHandlerOptions<{
                        body: CancelSubscriptionRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: SubscriptionsApiPath.STRIPE_WEBHOOK,
            method: 'POST',
            handler: (options) => {
                return this.webHookListener(
                    options as ApiHandlerOptions<{
                        body: WebhookBody;
                    }>,
                );
            },
        });

        this.addRoute({
            path: SubscriptionsApiPath.SUBSCRIBE_TRIAL,
            method: 'POST',
            isProtected: true,
            handler: (options) =>
                this.createTrial(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: SubscribeRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/subscriptions/current-subscription:
     *    get:
     *      tags:
     *       - Subscription
     *      description: Returns current subscription of authorized user
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Subscription'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async find(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.subscriptionService.find({
                userId: options.user.id,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/subscriptions/subscribe:
     *   post:
     *     tags:
     *       - Subscription
     *     summary: Subscribe to a plan
     *     description: Subscribe a user to a subscription plan
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               planId:
     *                 type: string
     *                 description: The ID of the plan to subscribe to.
     *               stripePriceId:
     *                 type: string
     *                 description: The Stripe price ID associated with the plan.
     *     responses:
     *       200:
     *         description: Subscription successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 stripeSubscriptionId:
     *                   type: string
     *                   description: The ID of the subscription created in Stripe.
     *                 clientSecret:
     *                   type: string
     *                   description: The client secret required for confirming the subscription on the client side.
     *       409:
     *         description: Conflict - User already has an active subscription to the same plan
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Internal Server Error - Error occurred during subscription process
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    private async subscribe(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: SubscribeRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { planId, stripePriceId } = options.body;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.CREATED,
            payload: await this.subscriptionService.subscribe(options.user, {
                planId,
                stripePriceId,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/subscriptions/cancel-subscription:
     *   patch:
     *     tags:
     *       - Subscription
     *     summary: Cancel a subscription
     *     description: Update the cancellation status of a subscription
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               stripeSubscriptionId:
     *                 type: string
     *                 description: The ID of the subscription in Stripe.
     *               isCanceled:
     *                 type: boolean
     *                 description: The status indicating whether the subscription is canceled.
     *     responses:
     *       200:
     *         description: Subscription cancellation successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 isCanceled:
     *                   type: boolean
     *                   description: The updated cancellation status of the subscription.
     *       400:
     *         description: Bad Request - Missing or invalid parameters
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Internal Server Error - Error occurred during subscription cancellation process
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    private async updateCancelSubscribtion(
        options: ApiHandlerOptions<{
            body: CancelSubscriptionRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { isCanceled, stripeSubscriptionId } = options.body;

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.subscriptionService.updateCancelSubscribtion({
                stripeSubscriptionId,
                isCanceled,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/subscriptions/subscribe-trial:
     *   post:
     *     tags:
     *       - Subscription
     *     summary: Subscribe to a trial plan
     *     description: Subscribe a user to a trial subscription plan
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               planId:
     *                 type: string
     *                 description: The ID of the trial plan to subscribe to.
     *               stripePriceId:
     *                 type: string
     *                 description: The Stripe price ID associated with the trial plan.
     *     responses:
     *       200:
     *         description: Trial subscription successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 stripeSubscriptionId:
     *                   type: string
     *                   description: The ID of the trial subscription created in Stripe.
     *                 clientSecret:
     *                   type: string
     *                   description: The client secret required for confirming the subscription on the client side.
     *       500:
     *         description: Internal Server Error - Error occurred during trial subscription process
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */

    private async createTrial(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: SubscribeRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { planId, stripePriceId } = options.body;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.CREATED,
            payload: await this.subscriptionService.createTrialSubscription(
                options.user,
                {
                    planId,
                    stripePriceId,
                },
            ),
        };
    }

    /**
     * @swagger
     * /api/v1/subscriptions/stripe-webhook:
     *   post:
     *     tags:
     *       - Subscription
     *     summary: Webhook Listener
     *     description: Listen to webhook events from Stripe and update subscription statuses accordingly
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               body:
     *                 type: object
     *                 description: The body of the webhook event from Stripe.
     *     responses:
     *       200:
     *         description: Webhook event processed successfully
     *       500:
     *         description: Internal Server Error - Error occurred while processing the webhook event
     */
    private async webHookListener(
        options: ApiHandlerOptions<{
            body: WebhookBody;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.subscriptionService.webHookListener(
                options.body.stripeWebhookEvent,
            ),
        };
    }
}

export { SubscriptionController };
