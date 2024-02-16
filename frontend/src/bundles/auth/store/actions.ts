import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserAuthRequestDto } from '~/bundles/users/users.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { type AuthResponseDto } from '../auth.js';
import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    AuthResponseDto,
    UserAuthRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signUp(registerPayload);
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

export { signIn, signUp };
