import { Button } from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';

import { actions as subscriptionActions } from '../../store/subscriptions.js';

const SubscriptionUserPanel = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const userId = 5;

    const handleCancelSubscription = useCallback((): void => {
        void dispatch(subscriptionActions.cancelSubscription({ userId }));
    }, [dispatch]);

    return (
        <div
            className={
                'bg-lm-yellow-200 w-full max-w-[30rem] rounded-2xl p-4 md:max-w-full md:p-6'
            }
        >
            <div className="flex flex-col gap-3">
                <h3 className={'mb-2 text-center text-xl font-extrabold'}>
                    Hi,{' '}
                </h3>
                <div>
                    <div
                        className={
                            'border-lm-black-100 rounded-md border-2 p-5'
                        }
                    >
                        <p className="text-lm-grey-300 text-lg font-bold">
                            Your Subscription
                        </p>
                        <p className={'text-3xl font-extrabold'}></p>
                        <div>
                            <p className="text-lm-grey-300 text-lg font-bold">
                                Renews on
                            </p>
                            <p className={'text-2xl font-bold'}></p>
                        </div>
                        <div>
                            <p className="text-lm-grey-300 text-lg font-bold">
                                Payment
                            </p>
                            <p className={'text-2xl font-bold'}>$ / month</p>
                        </div>
                    </div>
                </div>
                <Button
                    variant="primary"
                    label="Cancel subscription"
                    size="medium"
                    type="button"
                    onClick={handleCancelSubscription}
                />
            </div>
        </div>
    );
};

export { SubscriptionUserPanel };
