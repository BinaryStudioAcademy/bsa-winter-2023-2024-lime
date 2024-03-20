import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { Button } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as subscriptionActions } from '~/bundles/subscription/store/subscriptions.js';

const CheckoutForm = (): JSX.Element => {
    const [buyWithPoints] = useState(false);
    const { user } = useAppSelector(({ auth }) => auth);
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitPayment = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }

            void dispatch(
                subscriptionActions.confirmPayment({ elements, stripe }),
            );
        },
        [elements, stripe, dispatch],
    );

    return (
        <>
            {!buyWithPoints && (
                <form onSubmit={handleSubmitPayment}>
                    <PaymentElement />
                    <div>
                        <Button
                            type="submit"
                            label="Pay now!"
                            variant="primary"
                            size="md"
                        />
                    </div>
                </form>
            )}
            {buyWithPoints && (
                <div className="mt-8">
                    <h1>Current points</h1>
                    <h2>{user?.bonusBalance}</h2>
                    <Button
                        type="submit"
                        label="Pay now!"
                        variant="primary"
                        size="md"
                      
                    />
                </div>
            )}
            <div className="mt-8">
                <Button
                    type="submit"
                    label="Buy with points!"
                    variant="primary"
                    size="md"
                    
                />
            </div>
        </>
    );
};

export { CheckoutForm };
