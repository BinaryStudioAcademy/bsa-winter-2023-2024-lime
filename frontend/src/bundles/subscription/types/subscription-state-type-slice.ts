import { type DataStatusType  } from '~/bundles/common/types/types.js';

import {
    type SubscriptionGetItemResponseDto,
    type SubscriptionPlansGetAllItemResponseDto,
} from './types.js';

type subscripcionsStateTypeSlice = {
    subscriptionPlans: SubscriptionPlansGetAllItemResponseDto[] | null;
    currentSubscription: SubscriptionGetItemResponseDto | null;
    clientSecret: string | null;
    subscriptionToken: string | null;
    dataStatus: DataStatusType;
    confirmPaymentStatus: DataStatusType;
};

export { type subscripcionsStateTypeSlice };
