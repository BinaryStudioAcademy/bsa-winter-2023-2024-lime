import { createAsyncThunk } from '@reduxjs/toolkit';
import { type SubscribeRequestDto } from 'shared';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponseDto,
    type UserGetAllResponseDto,
} from '~/bundles/users/users.js';

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
    SubscribeRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/buy-with-bonus`,
    async ({ planId, stripePriceId }, { extra }) => {
        const { userApi } = extra;
        return await userApi.buySubscriptionWithBonus({
            planId,
            stripePriceId,
        });
    },
);

export { buyWithBonus, getById, loadAll };
