import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type AsyncThunkConfig,
    type ValueOf,
} from '~/bundles/common/types/types.js';
import { type OAuthProvider } from '~/bundles/profile/pages/connections-page/enums/enums.js';
import {
    type ConnectionGetAllItemResponseDto,
    type OAuthDeauthorizeResponseDto,
} from '~/bundles/profile/pages/connections-page/types/types.js';

import { name } from './slice.js';

const getAll = createAsyncThunk<
    ConnectionGetAllItemResponseDto,
    undefined,
    AsyncThunkConfig
>(`${name}/get-all-connections`, async (_, { extra }) => {
    const { connectionApi } = extra;

    return await connectionApi.getAll();
});

const authorize = createAsyncThunk<
    unknown,
    ValueOf<typeof OAuthProvider>,
    AsyncThunkConfig
>(`${name}/authorize`, async (provider, { extra }) => {
    const { connectionApi } = extra;

    await connectionApi.authorize(provider);
});

const deauthorize = createAsyncThunk<
    OAuthDeauthorizeResponseDto,
    ValueOf<typeof OAuthProvider>,
    AsyncThunkConfig
>(`${name}/deauthorize`, async (provider, { extra }) => {
    const { connectionApi } = extra;

    return await connectionApi.deauthorize(provider);
});

export { authorize, deauthorize, getAll };
