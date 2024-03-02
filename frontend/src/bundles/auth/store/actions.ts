import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type AsyncThunkConfig,
    type UserAuthResponseDto,
} from '~/bundles/common/types/types.js';
import { type UserAuthRequestDto } from '~/bundles/users/users.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { type AuthResponseDto } from '../auth.js';
import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    AuthResponseDto,
    UserAuthRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
    const { authApi } = extra;
    const response = await authApi.signUp(registerPayload);
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

const updateUser = createAsyncThunk<
    UserAuthResponseDto,
    FormData,
    AsyncThunkConfig
>(`${sliceName}/update-user`, async (updateUserPayload, { extra }) => {
    const { userApi } = extra;
    const userId = updateUserPayload.get('id')?.toString() ?? '';
    return await userApi.updateUser(userId, updateUserPayload);
});

export { refreshUser, signIn, signUp, updateUser };
