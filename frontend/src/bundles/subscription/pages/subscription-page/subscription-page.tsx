import { Loader } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
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
    const { dataStatus, subscriptionPlans, currentSubscription } =
        useAppSelector(({ subscriptions }) => ({
            subscriptionPlans: subscriptions.subscriptionPlans,
            currentSubscription: subscriptions.currentSubscription,
            dataStatus: subscriptions.dataStatus,
        }));

    const dispatch = useAppDispatch();
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
        ({ planId, stripePriceId }: SubscribeRequestDto): void => {
            void dispatch(
                subscriptionActions.createSubscription({
                    planId,
                    stripePriceId,
                }),
            );

            navigate(AppRoute.PROFILE_SUBSCRIPTION_CHECKOUT);
        },
        [dispatch, navigate],
    );

    if (dataStatus === DataStatus.PENDING) {
        return <Loader />;
    }

    return (
        <div className="m-auto mt-5 flex w-full max-w-[50rem] flex-col justify-center gap-10 px-2">
            <div className={'flex flex-col items-center justify-center gap-2'}>
                {currentSubscription ? (
                    <SubscriptionUserPanel
                        subscriptionPlanName={
                            currentSubscription.subscriptionPlanName as string
                        }
                        subscriptionPlanPrice={
                            currentSubscription.subscriptionPlanPrice as number
                        }
                        stripeSubscriptionId={
                            currentSubscription.stripeSubscriptionId
                        }
                        status={currentSubscription.status}
                        isCanceled={currentSubscription.isCanceled}
                        expiresAt={currentSubscription.expiresAt}
                        onChangeSubscription={handleChangeSubscription}
                    />
                ) : (
                    <span className="font-base text-xl text-white">
                        Looks like you dont have subscription yet. Choose from
                        below.
                    </span>
                )}
            </div>
            <div className="flex w-full flex-col items-center gap-6">
                {subscriptionPlans &&
                    subscriptionPlans.map((plan) => {
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
                                    stripePriceId={plan.stripePriceId}
                                    onSubscribe={handleCreateSubscription}
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
                                    stripePriceId={plan.stripePriceId}
                                    onSubscribe={handleCreateSubscription}
                                />
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export { SubscriptionPage };
