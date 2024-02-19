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

const { productId: basicProductId, priceId: basicPriceId } =
    await stripeService.createProduct({ ...subscriptionBasic });
const { productId: proProductId, priceId: proPriceId } =
    await stripeService.createProduct({ ...subscriptionPro });

const subscriptionPlans = [
    {
        ...subscriptionBasic,
        productToken: basicProductId,
        priceToken: basicPriceId,
    },
    {
        ...subscriptionPro,
        productToken: proProductId,
        priceToken: proPriceId,
    },
];

export { subscriptionPlans };
