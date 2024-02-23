import { type SubscriptionItemResponseDto } from 'shared/src/bundles/subscriptions/types/types.js';
import { type Stripe } from 'stripe';

import { stripeService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import {
    HttpCode,
    HttpError,
    SubscriptionValidationMessage,
    SubscriptionWebHooks,
} from './enums/enums.js';
import { type SubscriptionRepository } from './subscription.repository.js';
import {
    type CancelSubscriptionRequestDto,
    type SubscribeRequestDto,
    type SubscribeResponseDto,
} from './types/types.js';

class SubscriptionService
    implements
        Omit<Service, 'find' | 'findAll' | 'create' | 'update' | 'delete'>
{
    private subscriptionRepository: SubscriptionRepository;

    public constructor(subscriptionRepository: SubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public async findByUserId(
        userId: number,
    ): Promise<SubscriptionItemResponseDto> {
        const subscription = await this.subscriptionRepository.find({
            userId,
        });

        if (!subscription) {
            throw new HttpError({
                message: SubscriptionValidationMessage.SUBSCRIPTION_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        return subscription.toObject();
    }

    public async subscribe({
        planId,
        userId,
        customerToken,
        priceToken,
    }: SubscribeRequestDto): Promise<SubscribeResponseDto> {
        const currentSubscription = await this.findByUserId(userId);

        if (
            currentSubscription.planId === planId &&
            currentSubscription.status === 'active'
        ) {
            throw new HttpError({
                message:
                    SubscriptionValidationMessage.SUBSCRIPTION_ALREDY_IN_USE,
                status: HttpCode.CONFLICT,
            });
        }

        const { subscriptionToken, clientSecret, status, expirationDate } =
            await stripeService.createSubscription({
                customerId: customerToken,
                priceId: priceToken,
            });

        try {
            await this.subscriptionRepository.updateSubscription(
                { userId },
                {
                    planId,
                    status,
                    subscriptionToken,
                    expirationDate,
                },
            );

            return { subscriptionId: subscriptionToken, clientSecret };
        } catch (error) {
            await stripeService.immediateCancelSubscription({
                subscriptionToken,
            });

            throw new HttpError({
                message: (error as Error).message,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }

    public async cancelSubscribtion({
        userId,
    }: CancelSubscriptionRequestDto): Promise<boolean> {
        const currentSubscription = await this.findByUserId(userId);

        if (
            !currentSubscription.subscriptionToken ||
            currentSubscription.cancelAtPeriodEnd
        ) {
            throw new HttpError({
                message:
                    SubscriptionValidationMessage.SUBSCRIPTION_CANNOT_BE_CANCELED,
                status: HttpCode.BAD_REQUEST,
            });
        }

        try {
            await stripeService.softCancelSubscription({
                subscriptionToken: currentSubscription.subscriptionToken,
            });

            return true;
        } catch (error) {
            throw new HttpError({
                message: (error as Error).message,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }

    public async webHooksListener({ body }: { body: unknown }): Promise<void> {
        const stripeResponse = body as Stripe.Event;
        if (
            !stripeResponse ||
            !stripeResponse.type ||
            !stripeResponse.data.object
        ) {
            return;
        }

        switch (stripeResponse.type) {
            case SubscriptionWebHooks.CUSTOMER_SUBSCRIPTION_UPDATED: {
                const subscription = stripeResponse.data.object;
                await this.subscriptionRepository.updateSubscription(
                    { subscriptionToken: subscription.id },
                    {
                        status: subscription.status,
                        cancelAtPeriodEnd: subscription.cancel_at_period_end,
                        expirationDate: new Date(
                            subscription.current_period_end * 1000,
                        ),
                    },
                );
                break;
            }
            case SubscriptionWebHooks.CUSTOMER_SUBSCRIPTION_DELETED: {
                const subscription = stripeResponse.data.object;
                await this.subscriptionRepository.updateSubscription(
                    { subscriptionToken: subscription.id },
                    {
                        status: subscription.status,
                        expirationDate: null,
                    },
                );
                break;
            }
            default: {
                break;
            }
        }
    }
}

export { SubscriptionService };
