import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { type StripeElementsOptions } from '@stripe/stripe-js';

import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import {
    createSelector,
    selectSubscriptions,
} from '~/bundles/common/redux/selectors/selectors.js';
import { CheckoutForm } from '~/bundles/subscription/components/components.js';
import { config } from '~/framework/config/config.js';

const stripe = loadStripe(config.ENV.STRIPE.PUBLIC_KEY);

const SubscriptionCheckout = (): JSX.Element => {
    const selectSubscriptionData = useMemo(
        () =>
            createSelector([selectSubscriptions], (subscriptions) => ({
                clientSecret: subscriptions?.clientSecret as string,
            })),
        [],
    );

    const { clientSecret } = useAppSelector(selectSubscriptionData);

    const options: StripeElementsOptions = {
        locale: 'en',
        clientSecret,
        appearance: {
            theme: 'night',
            variables: {
                colorPrimary: '#E0FE10',
            },
        },
    };

    return (
        <section className="bg-lm-black-100 m-auto w-full max-w-[80rem] rounded-xl p-6">
            {Boolean(clientSecret) && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutForm />
                </Elements>
            )}
        </section>
    );
};

export { SubscriptionCheckout };
