import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';

import {
    SubscriptionPlan,
    SubscriptionUserPanel,
} from '../../components/components.js';
import { actions as plansActions } from '../../store/subscriptions.js';

const Subscription = (): JSX.Element => {
    const { subscriptionPlans } = useAppSelector(
        (item) => item.subscriptionPlans,
    );
    const dispatch = useAppDispatch();

    const handleSubscriptionPlansLoad = useCallback((): void => {
        void dispatch(plansActions.loadAllSubscriptionPlans());
    }, [dispatch]);

    useEffect(() => {
        handleSubscriptionPlansLoad();
    }, [handleSubscriptionPlansLoad]);

    return (
        <div className={'mt-5 flex flex-col justify-center gap-10 '}>
            <div className={'flex items-center justify-center'}>
                <SubscriptionUserPanel />
            </div>
            <div
                className={
                    'flex flex-col items-center justify-center gap-6 px-5 md:flex-row'
                }
            >
                {subscriptionPlans.map((plan, index) => (
                    <SubscriptionPlan
                        key={index}
                        name={plan.name}
                        price={plan.price}
                        description={plan.description ?? ''}
                        productToken={plan.productToken}
                    />
                ))}
            </div>
        </div>
    );
};

export { Subscription };
