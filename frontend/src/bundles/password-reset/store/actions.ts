import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type PasswordForgotRequestDto,
    type PasswordForgotResponseDto,
    type PasswordResetRequestDto,
    type PasswordResetResponseDto,
} from '~/bundles/password-reset/types/types.js';

import { name as sliceName } from './slice.js';

const forgotPassword = createAsyncThunk<
    PasswordForgotResponseDto,
    PasswordForgotRequestDto,
    AsyncThunkConfig
>(`${sliceName}/forgot-password`, async (passwordForgotPayload, { extra }) => {
    const { passwordResetApi } = extra;
    return await passwordResetApi.forgotPassword(passwordForgotPayload);
});

const resetPassword = createAsyncThunk<
    PasswordResetResponseDto,
    PasswordResetRequestDto,
    AsyncThunkConfig
>(`${sliceName}/reset-password`, async (passwordResetPayload, { extra }) => {
    const { passwordResetApi } = extra;
    return await passwordResetApi.resetPassword(passwordResetPayload);
});

export { forgotPassword, resetPassword };
