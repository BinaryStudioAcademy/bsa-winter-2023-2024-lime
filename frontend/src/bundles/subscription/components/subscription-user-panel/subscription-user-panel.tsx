import { Button } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { actions as userActions } from '~/bundles/users/store/users.js';

import { type SubscriptionStatus } from '../../enums/enums.js';
import { dateConverter } from '../../helpers/helpers.js';
import { actions as subscriptionActions } from '../../store/subscriptions.js';

type Properties = {
    subscriptionPlanName: string;
    subscriptionPlanPrice: number;
    subscriptionPlanBonusPrice: number;
    status: ValueOf<typeof SubscriptionStatus>;
    isCanceled: boolean;
    expiresAt: Date;
    stripeSubscriptionId: string;
    onChangeSubscription: () => void;
};

const SubscriptionUserPanel: React.FC<Properties> = ({
    subscriptionPlanName,
    subscriptionPlanPrice,
    subscriptionPlanBonusPrice,
    status,
    isCanceled,
    expiresAt,
    stripeSubscriptionId,
    onChangeSubscription,
}): JSX.Element => {
    const dispatch = useAppDispatch();

    const [currentCancelAtPeriodEnd, setCurrentCancelAtPeriodEnd] =
        useState(isCanceled);

    const handleUpdateCancelSubscription = useCallback((): void => {
        void dispatch(
            subscriptionActions.updateCancelSubscription({
                stripeSubscriptionId,
                isCanceled: !currentCancelAtPeriodEnd,
            }),
        );

        setCurrentCancelAtPeriodEnd(!currentCancelAtPeriodEnd);
    }, [dispatch, stripeSubscriptionId, currentCancelAtPeriodEnd]);

    const handleUpdateTrialSubscription = useCallback((): void => {
        void dispatch(
            userActions.updateTrialSubscription({
                stripeSubscriptionId,
                bonusPrice: subscriptionPlanBonusPrice,
            }),
        );
    }, [dispatch, stripeSubscriptionId, subscriptionPlanBonusPrice]);
    return (
        <div className="bg-secondary w-full max-w-[30rem] rounded-2xl p-4 md:max-w-full md:p-6">
            <div className="flex flex-col gap-3">
                <div>
                    <div className="border-lm-grey-200 rounded-md border-2 p-5">
                        <p className="text-primary text-lg">
                            Your Subscription
                        </p>
                        <p className="text-action text-3xl">
                            {subscriptionPlanName.toUpperCase()}
                        </p>
                        <p className="text-primary text-lg">Status</p>
                        <p className="text-action text-3xl">
                            {status.toUpperCase() === 'TRIALING'
                                ? 'Active (Purchased by Points)'
                                : status.toUpperCase()}
                        </p>
                        <div>
                            {isCanceled ? (
                                <span className="text-lm-red">Expires at</span>
                            ) : (
                                <span className="text-primary">Renews at</span>
                            )}
                            <p className="text-action text-2xl">
                                {dateConverter(expiresAt)}
                            </p>
                        </div>
                        <div>
                            <p className="text-primary text-lg">Payment</p>
                            <p className="text-primary">
                                <span className="text-action text-xl">
                                    ${subscriptionPlanPrice}
                                </span>
                                <span> or </span>
                                <span className="text-action text-xl">
                                    {subscriptionPlanBonusPrice || ''}
                                </span>{' '}
                                points / month
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                    <Button
                        type="button"
                        size="md"
                        variant={isCanceled ? 'primary' : 'danger'}
                        label={
                            isCanceled
                                ? 'Renew subscription'
                                : 'Cancel subscription'
                        }
                        onClick={handleUpdateCancelSubscription}
                    />
                    <Button
                        type="button"
                        size="md"
                        variant="primary"
                        label="Change subscription plan"
                        onClick={onChangeSubscription}
                    />
                    <Button
                        type="button"
                        size="md"
                        variant="secondary"
                        label="Pay next with bonus"
                        onClick={handleUpdateTrialSubscription}
                    />
                </div>
            </div>
        </div>
    );
};

export { SubscriptionUserPanel };
