import { Button } from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';

import { actions as subscriptionActions } from '../../store/subscriptions.js';

const SubscriptionUserPanel = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const userId = 2;

    const handleCancelSubscription = useCallback((): void => {
        void dispatch(subscriptionActions.cancelSubscription({ userId }));
    }, [dispatch]);

    return (
        <div
            className={
                'bg-lm-black-100 w-full max-w-[30rem] rounded-2xl p-4 md:max-w-full md:p-6'
            }
        >
            <div className="flex flex-col gap-3">
                <h3
                    className={
                        'mb-2 text-center text-xl font-extrabold text-white'
                    }
                >
                    Hi, <span className="text-lm-yellow-100">Name</span>
                </h3>
                <div>
                    <div className={'rounded-md border-2 border-white p-5'}>
                        <p className="text-lg font-bold text-white">
                            Your Subscription
                        </p>
                        <p
                            className={
                                'text-lm-yellow-100 text-3xl font-extrabold'
                            }
                        >
                            PRO
                        </p>
                        <div>
                            <p className="text-lg font-bold text-white">
                                Renews on
                            </p>
                            <p
                                className={
                                    'text-lm-yellow-100 text-2xl font-bold'
                                }
                            >
                                29.12.2029
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">
                                Payment
                            </p>
                            <p
                                className={
                                    'text-lm-yellow-100 text-2xl font-bold'
                                }
                            >
                                $9.99/month
                            </p>
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
