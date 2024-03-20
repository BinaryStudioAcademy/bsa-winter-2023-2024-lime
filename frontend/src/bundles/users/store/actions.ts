import { createAsyncThunk } from '@reduxjs/toolkit';

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

export { getById, loadAll };
