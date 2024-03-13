import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type GoalResponseDto } from '../types/types.js';
import { createGoal, getGoals } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    goals: GoalResponseDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    goals: [],
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
            state.goals.push(action.payload);
        });
        builder.addCase(createGoal.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
