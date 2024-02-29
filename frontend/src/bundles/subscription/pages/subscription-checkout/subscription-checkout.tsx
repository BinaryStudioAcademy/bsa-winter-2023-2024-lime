import { Elements } from '@stripe/react-stripe-js';
import { type StripeElementsOptions, loadStripe } from '@stripe/stripe-js';

import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { CheckoutForm } from '~/bundles/subscription/components/components.js';
import { config } from '~/framework/config/config.js';

const stripe = loadStripe(config.ENV.STRIPE.PUBLIC_KEY);

const SubscriptionCheckout = (): JSX.Element => {
    const { clientSecret } = useAppSelector(({ subscriptions }) => {
        return {
            clientSecret: subscriptions?.clientSecret as string,
        };
    });

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'night',
            variables: {
                colorPrimary: '#E0FE10',
            },
        },
    };

    return (
        <section className="bg-secondary m-auto w-full max-w-[80rem] rounded-xl p-6">
            {Boolean(clientSecret) && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutForm />
                </Elements>
            )}
        </section>
    );
};

export { SubscriptionCheckout };
