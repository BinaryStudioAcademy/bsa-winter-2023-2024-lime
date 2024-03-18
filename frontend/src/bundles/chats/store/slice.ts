import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ChatResponseDto } from '../types/types.js';
import { getAllChats, getChat } from './actions.js';

type State = {
    chats: ChatResponseDto[];
    currentChat: ChatResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    chats: [],
    currentChat: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllChats.fulfilled, (state, action) => {
            state.chats = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getAllChats.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAllChats.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(getChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getChat.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getChat.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
