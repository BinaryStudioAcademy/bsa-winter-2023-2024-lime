import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { Button } from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { actions as subscriptionActions } from '~/bundles/subscription/store/subscriptions.js';

const CheckoutForm = (): JSX.Element => {
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
    );
};

export { CheckoutForm };
