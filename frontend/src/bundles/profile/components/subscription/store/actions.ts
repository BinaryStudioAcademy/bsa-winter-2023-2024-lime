import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type SubscriptionPlansGetAllResponseDto } from '../types/types.js';

const loadAllSubscriptionPlans = createAsyncThunk<
    SubscriptionPlansGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>('subscriptions-plans/loadAll', (_, { extra: { subscriptionPlansApi } }) => {
    return subscriptionPlansApi.getAllSubscriptionPlans();
});

export { loadAllSubscriptionPlans };
