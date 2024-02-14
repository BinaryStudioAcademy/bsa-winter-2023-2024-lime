import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserAuthResponseDto,
    UserAuthRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signUp(registerPayload);
});

export { signUp };
