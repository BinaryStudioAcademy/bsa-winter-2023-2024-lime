import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { type StripeElementsOptions } from '@stripe/stripe-js';

import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { config } from '~/framework/config/config.js';

import { CheckoutForm } from './components/components.js';

const stripe = loadStripe(config.ENV.STRIPE.PUBLIC_KEY);

const SubscriptionCheckout = (): JSX.Element => {
    const { clientSecret } = useAppSelector((state) => {
        return {
            clientSecret: state.subscriptions.clientSecret,
        };
    });

    const options: StripeElementsOptions = {
        clientSecret: clientSecret ?? '',
        appearance: {
            theme: 'flat',
        },
    };

    return (
        <section className={'bg-lm-yellow-200 mx-10 rounded-lg p-6'}>
            {Boolean(clientSecret) && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutForm />
                </Elements>
            )}
        </section>
    );
};

export { SubscriptionCheckout };
