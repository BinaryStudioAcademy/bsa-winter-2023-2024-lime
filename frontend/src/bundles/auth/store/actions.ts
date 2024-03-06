import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type AsyncThunkConfig,
    type UserAuthResponseDto,
} from '~/bundles/common/types/types.js';
import {
    type UserAuthRequestDto,
    type UserBonusGetAllResponseDto,
    type UserUpdateProfileRequestDto,
} from '~/bundles/users/users.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { type AuthResponseDto } from '../auth.js';
import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    AuthResponseDto,
    { referralCode: string | null; signUpDTO: UserAuthRequestDto },
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
    const { authApi } = extra;
    const { referralCode, signUpDTO } = registerPayload;
    const response = await authApi.signUp(referralCode, signUpDTO);
    if (response.token) {
        await storage.set(StorageKey.TOKEN, response.token);
    }
    return response;
});

const signIn = createAsyncThunk<
    AuthResponseDto,
    UserAuthRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
    const { authApi } = extra;
    const response = await authApi.signIn(loginPayload);
    if (response.token) {
        await storage.set(StorageKey.TOKEN, response.token);
    }
    return response;
});

const refreshUser = createAsyncThunk<
    UserAuthResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/refresh-user`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.refreshUser();
});

const logout = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
    `${sliceName}/logout`,
    async () => {
        await storage.drop(StorageKey.TOKEN);
    },
);

const updateUser = createAsyncThunk<
    UserAuthResponseDto,
    UserUpdateProfileRequestDto,
    AsyncThunkConfig
>(`${sliceName}/update-user`, async (updateUserPayload, { extra }) => {
    const { userApi } = extra;
    return await userApi.updateUser(updateUserPayload);
});

const loadAllUserBonusesTransactions = createAsyncThunk<
    UserBonusGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/bonuses`, (_, { extra }) => {
    const { userApi } = extra;
    return userApi.getUserBonuses();
});

export {
    loadAllUserBonusesTransactions,
    logout,
    refreshUser,
    signIn,
    signUp,
    updateUser,
};
