import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type UserFriendsResponseDto } from '../types/types.js';
import { addFriend, getFriends, removeFriend } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    friends: UserFriendsResponseDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    friends: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'friends',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getFriends.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getFriends.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.friends = action.payload;
        });
        builder.addCase(getFriends.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(addFriend.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(addFriend.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.friends.unshift(action.payload);
        });
        builder.addCase(addFriend.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(removeFriend.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(removeFriend.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.friends = state.friends.filter(
                (friend) => friend.id !== action.payload,
            );
        });
        builder.addCase(removeFriend.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
