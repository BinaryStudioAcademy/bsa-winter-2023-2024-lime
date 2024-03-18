import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ScheduleResponseDto } from '../types/types.js';
import {
    createSchedule,
    deleteSchedule,
    getSchedules,
    updateSchedule,
} from './actions.js';

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

        builder.addCase(updateSchedule.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;

            const index = state.schedules.findIndex(
                (schedule) => schedule.id === action.payload.id,
            );

            if (index !== -1) {
                state.schedules[index] = action.payload;
            }
        });

        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;

            state.schedules = state.schedules.filter(schedule => {
                return schedule.id !== action.payload;
            });
        });

        builder.addMatcher(
            isAnyOf(
                getSchedules.pending,
                createSchedule.pending,
                updateSchedule.pending,
                deleteSchedule.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getSchedules.rejected,
                createSchedule.rejected,
                updateSchedule.rejected,
                deleteSchedule.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { type State, actions, name, reducer };
