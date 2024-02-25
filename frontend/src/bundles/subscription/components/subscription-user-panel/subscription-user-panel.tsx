import { Button } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type SubscriptionStatus } from '../../enums/enums.js';
import { actions as subscriptionActions } from '../../store/subscriptions.js';

type Properties = {
    subscriptionPlanName: string;
    subscriptionPlanPrice: number;
    status: ValueOf<typeof SubscriptionStatus>;
    cancelAtPeriodEnd: boolean;
    expirationDate: Date;
    subscriptionToken: string;
    handleChangeSubscription: () => void;
};

const SubscriptionUserPanel = ({
    subscriptionPlanName,
    subscriptionPlanPrice,
    status,
    cancelAtPeriodEnd,
    expirationDate,
    subscriptionToken,
    handleChangeSubscription,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();

    const [currentCancelAtPeriodEnd, setCurrentCancelAtPeriodEnd] =
        useState(cancelAtPeriodEnd);

    const handleUpdateCancelSubscription = useCallback((): void => {
        void dispatch(
            subscriptionActions.updateCancelSubscription({
                subscriptionToken,
                cancelAtPeriodEnd: !currentCancelAtPeriodEnd,
            }),
        );

        setCurrentCancelAtPeriodEnd(!currentCancelAtPeriodEnd);
    }, [dispatch, subscriptionToken, currentCancelAtPeriodEnd]);

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
                            {subscriptionPlanName}
                        </p>
                        <p className="text-lg font-bold text-white">Status</p>
                        <p className="text-lm-yellow-100 text-3xl font-extrabold">
                            {status.toUpperCase()}
                        </p>
                        <div>
                            <p className="text-lg font-bold text-white">
                                {cancelAtPeriodEnd ? (
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
                                {expirationDate?.toString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">
                                Payment
                            </p>
                            <p className="text-lm-yellow-100 text-2xl font-bold">
                                ${subscriptionPlanPrice} / month
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    variant="primary"
                    label={
                        cancelAtPeriodEnd
                            ? 'Renew subscription'
                            : 'Cancel subscription'
                    }
                    size="md"
                    type="button"
                    className={
                        cancelAtPeriodEnd ? 'text-lm-black-100' : 'text-lm-red'
                    }
                    onClick={handleUpdateCancelSubscription}
                />
                <Button
                    type="button"
                    size="md"
                    variant="primary"
                    label="Change subscription plan"
                    onClick={handleChangeSubscription}
                />
            </div>
        </div>
    );
};

export { SubscriptionUserPanel };
