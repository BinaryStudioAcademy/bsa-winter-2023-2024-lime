import { stripeService } from '~/common/services/services.js';

const subscriptionBasic = {
    name: 'Basic',
    price: 9.99,
    description:
        'Designed for those who are just starting their fitness journey or prefer a more self-guided approach. With this plan, you get: Access to our library of workout plans and exercises, Ad-Free Experience, Exclusive Offers, and Community Access.',
};

const subscriptionPro = {
    name: 'Pro',
    price: 29.99,
    description:
        'Designed for those who want a more personalized and data-driven approach to fitness. With this plan, you get all the benefits of the Basic Subscription, plus: AI-Powered Workouts, Adaptive Training, Priority Support, and Advanced Analytics.',
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
