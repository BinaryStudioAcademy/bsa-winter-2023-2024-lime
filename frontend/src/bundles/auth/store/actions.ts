import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type AsyncThunkConfig,
    type UserAuthResponseDto,
    type ValueOf,
} from '~/bundles/common/types/types.js';
import {
    type UserAuthRequestDto,
    type UserUpdateProfileRequestDto,
} from '~/bundles/users/users.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { type AuthResponseDto, type IdentityAuthTokenDto } from '../auth.js';
import { type IdentityProvider } from '../enums/enums.js';
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

const authorizeIdentity = createAsyncThunk<
    unknown,
    ValueOf<typeof IdentityProvider>,
    AsyncThunkConfig
>(`${sliceName}/auth-google`, async (provider, { extra }) => {
    const { authApi } = extra;
    return await authApi.authorizeIdentity(provider);
});

const signInIdentity = createAsyncThunk<
    AuthResponseDto,
    IdentityAuthTokenDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in-oauth-user`, async (tokenPayload, { extra }) => {
    const { authApi } = extra;
    const response = await authApi.signInIdentity(tokenPayload);
    if (response.token) {
        await storage.set(StorageKey.TOKEN, response.token);
    }
    return response;
});

export {
    authorizeIdentity,
    logout,
    refreshUser,
    signIn,
    signInIdentity,
    signUp,
    updateUser,
};
