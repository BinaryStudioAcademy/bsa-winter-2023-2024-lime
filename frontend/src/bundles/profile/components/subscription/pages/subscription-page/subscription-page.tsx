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

    const userId = 5;
    const customerToken = 'cus_PbaegsnO6k6Ubk';
    const { subscriptionPlans } = useAppSelector((state) => {
        return {
            subscriptionPlans: state.subscriptions.subscriptionPlans,
        };
    });

    const handleSubscriptionPlansLoad = useCallback((): void => {
        void dispatch(subscriptionActions.loadAllSubscriptionPlans());
    }, [dispatch]);

    useEffect(() => {
        handleSubscriptionPlansLoad();
    }, [handleSubscriptionPlansLoad]);

    //Needs message
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
                <SubscriptionUserPanel />
            </div>
            <div
                className={
                    'flex flex-col items-center justify-center gap-6 md:flex-row'
                }
            >
                {subscriptionPlans.map((plan) => (
                    <SubscriptionPlan
                        key={plan.id}
                        id={plan.id}
                        name={plan.name}
                        price={plan.price}
                        description={plan.description ?? ''}
                        priceToken={plan.priceToken}
                        handleClick={handleCreateSubscription}
                    />
                ))}
            </div>
        </div>
    );
};

export { SubscriptionPage };
