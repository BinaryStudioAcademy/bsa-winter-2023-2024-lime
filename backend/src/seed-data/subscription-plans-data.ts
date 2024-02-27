import { stripeService } from '~/common/services/services.js';

const subscriptionBasic = {
    name: 'Basic',
    price: 9.99,
    description: 'This is a basic plan.',
};

const subscriptionPro = {
    name: 'Pro',
    price: 29.99,
    description: 'This is a pro plan.',
};

const { stripeProductId: basicProductId, stripePriceId: basicPriceId } =
    await stripeService.createSubscriptionPlan({ ...subscriptionBasic });
const { stripeProductId: proProductId, stripePriceId: proPriceId } =
    await stripeService.createSubscriptionPlan({ ...subscriptionPro });

const subscriptionPlans = [
    {
        ...subscriptionBasic,
        stripeProductId: basicProductId,
        stripePriceId: basicPriceId,
    },
    {
        ...subscriptionPro,
        stripeProductId: proProductId,
        stripePriceId: proPriceId,
    },
];

export { subscriptionPlans };
