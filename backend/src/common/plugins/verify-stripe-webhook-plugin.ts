import { type FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { HttpCode, HttpHeader } from 'shared/src/framework/http/http.js';

import { type Stripe } from '~/bundles/subscriptions/types/types.js';

import { HttpError } from '../http/http.js';
import { type StripeService } from '../services/stripe/stripe.service.js';

type Options = {
    stripeService: StripeService;
};

const verifyStripeWebhook = fastifyPlugin<Options>(
    (fastify, { stripeService }, done) => {
        fastify.addHook(
            'preHandler',
            async (
                request: FastifyRequest<{
                    Body: { stripeWebhookEvent?: Stripe.Event };
                }>,
            ) => {
                const signature = request.headers[HttpHeader.STRIPE_SIGNATURE];
                if (
                    !(
                        request.rawBody &&
                        signature &&
                        typeof signature === 'string'
                    )
                ) {
                    return done(
                        new HttpError({
                            message: 'Stripe webhook error',
                            status: HttpCode.BAD_REQUEST,
                        }),
                    );
                }

                try {
                    const event = await stripeService.verifyWebhookRequest(
                        request.rawBody,
                        signature,
                    );
                    request.body.stripeWebhookEvent = event;
                } catch (error) {
                    done(
                        new HttpError({
                            message: (error as Error).message,
                            status: HttpCode.BAD_REQUEST,
                            cause: error,
                        }),
                    );
                }

                return done();
            },
        );
        done();
    },
);

export { verifyStripeWebhook };
