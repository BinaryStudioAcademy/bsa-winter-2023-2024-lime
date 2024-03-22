import { type SubscribeRequestDto } from './subscribe-request-dto.type.js';

type SubscribeBonusRequestDto = SubscribeRequestDto & {
    bonusPrice: number;
    stripeSubscriptionId?: string;
};
export { type SubscribeBonusRequestDto };
