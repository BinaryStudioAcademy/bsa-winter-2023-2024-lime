import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserBonusGetAllItemResponseDto } from '~/bundles/users/users.js';

import { loadAllUserBonusesTransactions } from './actions.js';

type State = {
    userBonusesTransactions: UserBonusGetAllItemResponseDto[];
    userBonusesStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    userBonusesTransactions: [],
    userBonusesStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'user-bonuses',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAllUserBonusesTransactions.pending, (state) => {
            state.userBonusesStatus = DataStatus.PENDING;
        });
        builder.addCase(
            loadAllUserBonusesTransactions.fulfilled,
            (state, action) => {
                state.userBonusesTransactions = action.payload.items;
                state.userBonusesStatus = DataStatus.FULFILLED;
            },
        );
        builder.addCase(loadAllUserBonusesTransactions.rejected, (state) => {
            state.userBonusesStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
