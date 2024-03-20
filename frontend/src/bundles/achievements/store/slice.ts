import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type AchievementsGetAllResponseDto } from '../types/types.js';
import { getAchievements, getAchievementsByUserId } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    achievements: AchievementsGetAllResponseDto[];
    userAchievements: AchievementsGetAllResponseDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    achievements: [],
    userAchievements: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'achievements',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAchievements.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAchievements.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.achievements = action.payload;
        });
        builder.addCase(getAchievements.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(getAchievementsByUserId.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAchievementsByUserId.fulfilled, (state, action) => {
            state.userAchievements = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getAchievementsByUserId.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
