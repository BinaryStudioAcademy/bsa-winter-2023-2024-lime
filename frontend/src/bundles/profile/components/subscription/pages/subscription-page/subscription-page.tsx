import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';

import {
    SubscriptionPlan,
    SubscriptionUserPanel,
} from '../../components/components.js';
import { actions as subscriptionActions } from '../../store/subscriptions.js';

const SubscriptionPage = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { subscriptionPlans, userId, customerToken, currentSubscription } =
        useAppSelector(({ auth, subscriptions }) => {
            return {
                userId: auth.user?.id as number,
                customerToken: auth.user?.customerToken as string,
                subscriptionPlans: subscriptions.subscriptionPlans,
                currentSubscription: subscriptions?.currentSubscription ?? null,
            };
        });

    const handleSubscriptionPlansLoad = useCallback((): void => {
        void dispatch(subscriptionActions.loadAllSubscriptionPlans());
    }, [dispatch]);

    const handleLoadCurrentSubscription = useCallback((): void => {
        void dispatch(subscriptionActions.loadCurrentSubscription());
    }, [dispatch]);

    useEffect(() => {
        handleLoadCurrentSubscription();
    }, [handleLoadCurrentSubscription]);

    useEffect(() => {
        handleSubscriptionPlansLoad();
    }, [handleSubscriptionPlansLoad]);

    const handleCreateSubscription = useCallback(
        ({
            planId,
            priceToken,
        }: {
            planId: number;
            priceToken: string;
        }): void => {
            if (!userId || !customerToken) {
                return;
            }

            void dispatch(
                subscriptionActions.createSubscription({
                    planId,
                    userId,
                    customerToken,
                    priceToken,
                }),
            );

            navigate(AppRoute.SUBSCRIPTION_CHECKOUT);
        },
        [dispatch, navigate, userId, customerToken],
    );

    return (
        <div
            className={
                'mx-auto mt-5 flex max-w-[50rem] flex-col justify-center gap-10'
            }
        >
            <div className={'flex items-center justify-center'}>
                {currentSubscription?.status &&
                currentSubscription?.status !== 'incomplete' ? (
                    <SubscriptionUserPanel
                        currentSubscription={currentSubscription}
                    />
                ) : (
                    <span
                        className={
                            'text-lm-black-100 text-start text-xl font-bold'
                        }
                    >
                        Dont have subscription yet. Choose from below.
                    </span>
                )}
            </div>
            <div
                className={
                    'flex flex-col items-center justify-center gap-6 md:flex-row'
                }
            >
                {currentSubscription &&
                    subscriptionPlans.map((plan) => {
                        if (currentSubscription.planId !== plan.id) {
                            return (
                                <SubscriptionPlan
                                    key={plan.id}
                                    id={plan.id}
                                    name={plan.name}
                                    price={plan.price}
                                    description={plan.description ?? ''}
                                    priceToken={plan.priceToken}
                                    handleClick={handleCreateSubscription}
                                />
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export { SubscriptionPage };
