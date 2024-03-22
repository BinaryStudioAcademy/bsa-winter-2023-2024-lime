import { Loader } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { UserBonusBalance } from '~/bundles/profile/components/user-balance/user-bonus-balance.js';
import { actions as userBonusesActions } from '~/bundles/user-bonuses/store/user-bonuses.js';
import { actions as userActions } from '~/bundles/users/store/users.js';

import {
    SubscriptionPlan,
    SubscriptionUserPanel,
} from '../../components/components.js';
import { actions as subscriptionActions } from '../../store/subscriptions.js';
import {
    type SubscribeBonusRequestDto,
    type SubscribeRequestDto,
} from '../../types/types.js';

const SubscriptionPage = (): JSX.Element => {
    const { dataStatus, subscriptionPlans, currentSubscription } =
        useAppSelector(({ subscriptions }) => subscriptions);

    const { userBonusesStatus, userBonusesTransactions } = useAppSelector(
        ({ userBonuses }) => userBonuses,
    );
    const { user } = useAppSelector(({ auth }) => auth);

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

    const handleBuyWithPoints = useCallback(
        ({
            planId,
            stripePriceId,
            bonusPrice,
        }: SubscribeBonusRequestDto): void => {
            if (!user) {
                return;
            }
            void dispatch(
                userActions.buyWithBonus({
                    planId,
                    stripePriceId,
                    bonusPrice,
                }),
            );
            handleLoadCurrentSubscription();
        },
        [dispatch, user, handleLoadCurrentSubscription],
    );

    const handleShowTransactions = useCallback((): void => {
        void dispatch(userBonusesActions.loadAllUserBonusesTransactions());
    }, [dispatch]);

    if (dataStatus === DataStatus.PENDING) {
        return (
            <div className="m-auto">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-[50rem] flex-col justify-start gap-10">
            <UserBonusBalance
                userBonusesTransactions={userBonusesTransactions}
                userBonusesStatus={userBonusesStatus}
                className="mx-auto w-[50%]"
                bonusBalance={user?.bonusBalance ?? 0}
                onShowTransactions={handleShowTransactions}
            />
            <div className="flex flex-col items-center justify-center gap-2">
                {currentSubscription ? (
                    <SubscriptionUserPanel
                        subscriptionPlanName={
                            currentSubscription.subscriptionPlanName as string
                        }
                        subscriptionPlanBonusPrice={
                            subscriptionPlans?.find(
                                (plan) =>
                                    plan.id === currentSubscription.planId,
                            )?.bonusPointsPrice as number
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
                    <span className="font-base text-primary text-xl">
                        Looks like you don&apos;t have subscription yet. Choose
                        from below.
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
                                    bonusPrice={plan.bonusPointsPrice}
                                    description={plan.description ?? ''}
                                    stripePriceId={plan.stripePriceId}
                                    onSubscribe={handleCreateSubscription}
                                    onBuyWithPoints={handleBuyWithPoints}
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
                                    bonusPrice={plan.bonusPointsPrice}
                                    description={plan.description ?? ''}
                                    stripePriceId={plan.stripePriceId}
                                    onSubscribe={handleCreateSubscription}
                                    onBuyWithPoints={handleBuyWithPoints}
                                />
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export { SubscriptionPage };
