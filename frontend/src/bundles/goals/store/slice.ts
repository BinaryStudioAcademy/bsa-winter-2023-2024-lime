import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type GoalResponseDto } from '../types/types.js';
import { createGoal, getGoals } from './actions.js';

const goals: GoalResponseDto[] = [
    {
        id: 1,
        activity: 'walking',
        frequency: 7,
        frequencyType: 'week',
        distance: 23,
        duration: 11,
        progress: 20,
        completedAt: '11/22/2024',
    },
    {
        id: 2,
        activity: 'running',
        frequency: 3,
        frequencyType: 'month',
        distance: 23,
        duration: 11,
        progress: 40,
        completedAt: '13/22/2024',
    },
    {
        id: 3,
        activity: 'cycling',
        frequency: 2,
        frequencyType: 'day',
        distance: 23,
        duration: 11,
        progress: 70,
        completedAt: '11/22/2024',
    },
    {
        id: 4,
        activity: 'walking',
        frequency: 1,
        frequencyType: 'week',
        distance: 23,
        duration: 11,
        progress: 95,
        completedAt: null,
    },
];

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    goals: GoalResponseDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    goals: goals || [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'goals',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getGoals.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getGoals.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.goals = action.payload;
        });
        builder.addCase(getGoals.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(createGoal.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(createGoal.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.goals.unshift(action.payload);
        });
        builder.addCase(createGoal.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
