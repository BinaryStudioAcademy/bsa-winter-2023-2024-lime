import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type ScheduleGetAllResponseDto } from '../types/types.js';
import { name } from './slice.js';

const getSchedules = createAsyncThunk<
    ScheduleGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${name}/get-schedules`, async (_, { extra }) => {
    const { scheduleApi } = extra;

    return await scheduleApi.getAll();
});

export { getSchedules };
