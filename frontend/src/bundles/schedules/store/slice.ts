import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ScheduleResponseDto } from '../types/types.js';
import { getSchedules } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    schedules: ScheduleResponseDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    schedules: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'schedules',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getSchedules.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getSchedules.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.schedules = action.payload.items;
        });
        builder.addCase(getSchedules.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
