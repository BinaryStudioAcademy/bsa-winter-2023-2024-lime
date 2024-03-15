import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserBonusGetAllResponseDto } from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const loadAllUserBonusesTransactions = createAsyncThunk<
    UserBonusGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/current`, (_, { extra }) => {
    const { userApi } = extra;
    return userApi.getUserBonuses();
});

export { loadAllUserBonusesTransactions };
