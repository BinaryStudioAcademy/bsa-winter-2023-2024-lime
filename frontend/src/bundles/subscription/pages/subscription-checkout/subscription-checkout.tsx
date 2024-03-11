import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { type StripeElementsOptions } from '@stripe/stripe-js';

import { Theme } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { CheckoutForm } from '~/bundles/subscription/components/components.js';
import { config } from '~/framework/config/config.js';

const stripe = loadStripe(config.ENV.STRIPE.PUBLIC_KEY);

const SubscriptionCheckout = (): JSX.Element => {
    const { theme } = useAppSelector((state) => state.theme);
    const { clientSecret } = useAppSelector(({ subscriptions }) => {
        return {
            clientSecret: subscriptions?.clientSecret as string,
        };
    });

    const options: StripeElementsOptions = {
        locale: 'en',
        clientSecret,
        appearance: {
            theme: theme === Theme.DARK ? 'night' : 'flat',
            variables: {
                colorPrimary: '#E0FE10',
            },
            rules:
                theme === Theme.LIGHT
                    ? {
                        '.Input': {
                            backgroundColor: 'white',
                        },
                        '.Select': {
                            backgroundColor: 'white',
                        },
                        '.Tab': {
                            boxShadow:
                                '0px 1px 1px rgba(5, 6, 7, 0.1), 0px 3px 6px rgba(18, 42, 66, 0.12)',
                        },
                    }
                    : {},
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
