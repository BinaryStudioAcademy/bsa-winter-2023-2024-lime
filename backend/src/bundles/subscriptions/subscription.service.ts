import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import { formatToDateFromUnix } from '~/common/helpers/helpers.js';
import { stripeService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import {
    HttpCode,
    HttpError,
    SubscriptionValidationMessage,
    SubscriptionWebHook,
} from './enums/enums.js';
import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionRepository } from './subscription.repository.js';
import {
    type CancelSubscriptionRequestDto,
    type CancelSubscriptionResponseDto,
    type Stripe,
    type SubscribeRequestDto,
    type SubscribeResponseDto,
    type SubscriptionGetItemResponseDto,
} from './types/types.js';

class SubscriptionService
    implements Omit<Service, 'findAll' | 'create' | 'update' | 'delete'>
{
    private subscriptionRepository: SubscriptionRepository;

    public constructor(subscriptionRepository: SubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<SubscriptionGetItemResponseDto | null> {
        const subscription =
            await this.subscriptionRepository.findCurrentSubscription(query);

        if (!subscription) {
            return null;
        }

        return subscription.toObject();
    }

    public async subscribe(
        { id: userId, customerToken }: UserAuthResponseDto,
        { planId, priceToken }: SubscribeRequestDto,
    ): Promise<SubscribeResponseDto> {
        const currentSubscription = await this.find({ userId });

        if (currentSubscription && currentSubscription.planId === planId) {
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
            await this.subscriptionRepository.create(
                SubscriptionEntity.initializeNew({
                    userId,
                    planId,
                    status,
                    subscriptionToken,
                    expirationDate,
                    cancelAtPeriodEnd: false,
                }),
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

    public async updateCancelSubscribtion({
        subscriptionToken,
        cancelAtPeriodEnd,
    }: CancelSubscriptionRequestDto): Promise<CancelSubscriptionResponseDto> {
        if (!subscriptionToken || typeof cancelAtPeriodEnd !== 'boolean') {
            throw new HttpError({
                message:
                    SubscriptionValidationMessage.SUBSCRIPTION_CANNOT_BE_CANCELED,
                status: HttpCode.BAD_REQUEST,
            });
        }

        try {
            await stripeService.updateCancelSubscription({
                subscriptionToken,
                cancelAtPeriodEnd,
            });

            return { cancelAtPeriodEnd };
        } catch (error) {
            throw new HttpError({
                message: (error as Error).message,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }

    public async webHookListener(body: unknown): Promise<void> {
        const stripeResponse = body as Stripe.Event;
        if (
            !stripeResponse ||
            !stripeResponse.type ||
            !stripeResponse.data.object
        ) {
            return;
        }

        switch (stripeResponse.type) {
            case SubscriptionWebHook.CUSTOMER_SUBSCRIPTION_UPDATED: {
                const subscription = stripeResponse.data.object;
                const updatedSubscription =
                    await this.subscriptionRepository.updateSubscriptionByToken(
                        subscription.id,
                        {
                            status: subscription.status,
                            cancelAtPeriodEnd:
                                subscription.cancel_at_period_end,
                            expirationDate: formatToDateFromUnix(
                                subscription.current_period_end,
                            ),
                        },
                    );
                if (!updatedSubscription) {
                    return;
                }

                const { userId } = updatedSubscription.toObject();

                const activeSubscriptions =
                    await this.subscriptionRepository.findAllActiveUserSubscriptions(
                        userId,
                    );

                if (activeSubscriptions && activeSubscriptions.length > 1) {
                    for (const [
                        index,
                        subscription,
                    ] of activeSubscriptions.entries()) {
                        if (index !== 0) {
                            const { subscriptionToken } =
                                subscription.toNewObject();
                            await stripeService.immediateCancelSubscription({
                                subscriptionToken,
                            });
                        }
                    }
                }
                break;
            }
            case SubscriptionWebHook.CUSTOMER_SUBSCRIPTION_DELETED: {
                const subscription = stripeResponse.data.object;
                await this.subscriptionRepository.delete({
                    subscriptionToken: subscription.id,
                });
                break;
            }
            default: {
                break;
            }
        }
    }
}

export { SubscriptionService };
