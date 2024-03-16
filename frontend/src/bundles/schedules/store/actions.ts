import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ScheduleGetAllResponseDto,
    type ScheduleRequestDto,
    type ScheduleResponseDto,
} from '../types/types.js';
import { name } from './slice.js';

const getSchedules = createAsyncThunk<
    ScheduleGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${name}/get-schedules`, async (_, { extra }) => {
    const { scheduleApi } = extra;

    return await scheduleApi.getAll();
});

const createSchedule = createAsyncThunk<
    ScheduleResponseDto,
    ScheduleRequestDto,
    AsyncThunkConfig
>(`${name}/create-schedule`, async (data, { extra }) => {
    const { scheduleApi } = extra;

    return await scheduleApi.createSchedule(data);
});

export { createSchedule, getSchedules };
