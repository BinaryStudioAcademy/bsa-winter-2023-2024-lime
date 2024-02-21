import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { type StripeElementsOptions } from '@stripe/stripe-js';

import { config } from '~/framework/config/config.js';

import { CheckoutForm } from './components/components.js';

const stripe = loadStripe(config.ENV.STRIPE.PUBLIC_KEY);

type Properties = {
    clientSecret: string;
};

const SubscriptionCheckout = ({ clientSecret }: Properties): JSX.Element => {
    const options: StripeElementsOptions = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'flat',
        },
    };

    return (
        <section>
            {Boolean(clientSecret) && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutForm />
                </Elements>
            )}
        </section>
    );
};

export { SubscriptionCheckout };
