import { createAsyncThunk } from '@reduxjs/toolkit';
import { type SubscribeResponseDto } from 'shared';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponseDto,
    type UserGetAllResponseDto,
} from '~/bundles/users/users.js';

import { type SubscribeBonusRequestDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

const getById = createAsyncThunk<UserAuthResponseDto, number, AsyncThunkConfig>(
    `${sliceName}/get-by-id`,
    async (id, { extra }) => {
        const { userApi } = extra;
        const idString = String(id);
        return userApi.getById(idString);
    },
);

const buyWithBonus = createAsyncThunk<
    UserAuthResponseDto,
    SubscribeBonusRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/buy-with-bonus`,
    async ({ planId, stripePriceId, bonusPrice }, { extra }) => {
        const { userApi } = extra;
        return await userApi.buySubscriptionWithBonus({
            planId,
            stripePriceId,
            bonusPrice,
        });
    },
);

const updateTrialSubscription = createAsyncThunk<
    SubscribeResponseDto,
    { bonusPrice: number; stripeSubscriptionId: string },
    AsyncThunkConfig
>(`${sliceName}/update-trial`, async (payload, { extra }) => {
    const { userApi } = extra;
    return userApi.updateTrialSubscription(payload);
});

export { buyWithBonus, getById, loadAll, updateTrialSubscription };
