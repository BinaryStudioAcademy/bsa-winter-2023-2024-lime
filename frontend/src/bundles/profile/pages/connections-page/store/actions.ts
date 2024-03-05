import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type ConnectionGetAllItemResponseDto } from '~/bundles/profile/pages/connections-page/types/types.js';

import { name } from './slice.js';

const getAll = createAsyncThunk<
    ConnectionGetAllItemResponseDto,
    undefined,
    AsyncThunkConfig
>(`${name}/get-all-connections`, (_, { extra }) => {
    const { connectionApi } = extra;

    return connectionApi.getAll();
});

export { getAll };
