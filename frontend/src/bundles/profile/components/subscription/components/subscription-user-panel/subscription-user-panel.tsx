import { type SubscriptionGetItemResponseDto } from 'shared';

import { Button } from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';

import { actions as subscriptionActions } from '../../store/subscriptions.js';

type Properties = {
    currentSubscription: SubscriptionGetItemResponseDto;
};

const SubscriptionUserPanel = ({
    currentSubscription,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleCancelSubscription = useCallback((): void => {
        void dispatch(
            subscriptionActions.updateCancelSubscription({
                subscriptionToken:
                    currentSubscription?.subscriptionToken as string,
                cancelAtPeriodEnd: true,
            }),
        );
    }, [dispatch, currentSubscription]);

    const handleRenewSubscription = useCallback((): void => {
        void dispatch(
            subscriptionActions.updateCancelSubscription({
                subscriptionToken:
                    currentSubscription?.subscriptionToken as string,
                cancelAtPeriodEnd: false,
            }),
        );
    }, [dispatch, currentSubscription]);

    return (
        <div
            className={
                'bg-lm-black-100 w-full max-w-[30rem] rounded-2xl p-4 md:max-w-full md:p-6'
            }
        >
            <div className="flex flex-col gap-3">
                <div>
                    <div className="rounded-md border-2 border-white p-5">
                        <p className="text-lg font-bold text-white">
                            Your Subscription
                        </p>
                        <p className="text-lm-yellow-100 text-3xl font-extrabold">
                            {currentSubscription.subscriptionPlanName}
                        </p>
                        <p className="text-lg font-bold text-white">Status</p>
                        <p className="text-lm-yellow-100 text-3xl font-extrabold">
                            {currentSubscription.status?.toUpperCase()}
                        </p>
                        <div>
                            <p className="text-lg font-bold text-white">
                                {currentSubscription.cancelAtPeriodEnd ? (
                                    <span className="text-lm-red">
                                        Expire on
                                    </span>
                                ) : (
                                    <span className="text-white">
                                        Renews on
                                    </span>
                                )}
                            </p>
                            <p className="text-lm-yellow-100 text-2xl font-bold">
                                {currentSubscription.expirationDate?.toString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">
                                Payment
                            </p>
                            <p className="text-lm-yellow-100 text-2xl font-bold">
                                ${currentSubscription.subscriptionPlanPrice} /
                                month
                            </p>
                        </div>
                    </div>
                </div>
                {currentSubscription.cancelAtPeriodEnd ? (
                    <Button
                        variant="primary"
                        label="Renew subscription"
                        size="md"
                        type="button"
                        onClick={handleRenewSubscription}
                    />
                ) : (
                    <Button
                        variant="primary"
                        label="Cancel subscription"
                        size="md"
                        type="button"
                        className={'text-lm-red'}
                        onClick={handleCancelSubscription}
                    />
                )}
            </div>
        </div>
    );
};

export { SubscriptionUserPanel };
