import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import {
    SubscriptionPlan,
    SubscriptionUserPanel,
} from '../../components/components.js';
import { actions as subscriptionActions } from '../../store/subscriptions.js';
import { type SubscribeRequestDto } from '../../types/types.js';

const SubscriptionPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { subscriptionPlans, currentSubscription } = useAppSelector(
        ({ subscriptions }) => ({
            subscriptionPlans: subscriptions.subscriptionPlans,
            currentSubscription: subscriptions.currentSubscription,
        }),
    );

    const navigate = useNavigate();

    const [changeSubscription, setChangeSubscription] = useState(false);
    const handleChangeSubscription = useCallback((): void => {
        setChangeSubscription(!changeSubscription);
    }, [changeSubscription]);

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
        ({ planId, priceToken }: SubscribeRequestDto): void => {
            void dispatch(
                subscriptionActions.createSubscription({
                    planId,
                    priceToken,
                }),
            );

            navigate(AppRoute.SUBSCRIPTION_CHECKOUT);
        },
        [dispatch, navigate],
    );

    return (
        <div
            className={
                'mx-auto mt-5 flex max-w-[50rem] flex-col justify-center gap-10'
            }
        >
            <div className={'flex flex-col items-center justify-center gap-2'}>
                {currentSubscription ? (
                    <SubscriptionUserPanel
                        subscriptionPlanName={
                            currentSubscription.subscriptionPlanName as string
                        }
                        subscriptionPlanPrice={
                            currentSubscription.subscriptionPlanPrice as number
                        }
                        status={currentSubscription.status}
                        expirationDate={currentSubscription.expirationDate}
                        cancelAtPeriodEnd={
                            currentSubscription.cancelAtPeriodEnd
                        }
                        subscriptionToken={
                            currentSubscription.subscriptionToken
                        }
                        handleChangeSubscription={handleChangeSubscription}
                    />
                ) : (
                    <span
                        className={
                            'text-lm-black-100 text-start text-xl font-bold'
                        }
                    >
                        Looks like you dont have subscription yet. Choose from
                        below.
                    </span>
                )}
            </div>
            <div className={'flex w-full flex-col items-center gap-6'}>
                {subscriptionPlans.map((plan) => {
                    if (
                        currentSubscription &&
                        changeSubscription &&
                        currentSubscription.planId !== plan.id
                    ) {
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
                    if (!currentSubscription) {
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
