import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type PasswordForgotRequestDto,
    type PasswordForgotResponseDto,
} from '~/bundles/password-reset/types/types.js';

import { name as sliceName } from './slice.js';

const passwordForgot = createAsyncThunk<
    PasswordForgotResponseDto,
    PasswordForgotRequestDto,
    AsyncThunkConfig
>(`${sliceName}/forgot-password`, async (passwordForgotPayload, { extra }) => {
    const { passwordResetApi } = extra;
    return await passwordResetApi.forgotPassword(passwordForgotPayload);
});

export { passwordForgot };
