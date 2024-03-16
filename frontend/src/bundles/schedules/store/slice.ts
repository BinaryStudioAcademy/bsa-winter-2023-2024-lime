import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ScheduleResponseDto } from '../types/types.js';
import { createSchedule, getSchedules } from './actions.js';

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
        builder.addCase(getSchedules.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.schedules = action.payload.items;
        });

        builder.addCase(createSchedule.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.schedules.push(action.payload);
        });

        builder.addMatcher(
            isAnyOf(getSchedules.pending, createSchedule.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(getSchedules.rejected, createSchedule.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { type State, actions, name, reducer };
