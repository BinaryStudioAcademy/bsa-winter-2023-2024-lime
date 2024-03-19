import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    type ChatFullResponseDto,
    type ChatPreviewResponseDto,
} from '../types/types.js';
import { applyMessage, getAllChats, getChat, sendMessage } from './actions.js';

type State = {
    chats: ChatPreviewResponseDto[];
    aiAssistantChat: ChatPreviewResponseDto | null;
    currentChat: (ChatFullResponseDto & { membersId: number[] }) | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    chats: [],
    aiAssistantChat: null,
    currentChat: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chats',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllChats.fulfilled, (state, action) => {
            state.chats = action.payload.userChats;
            state.aiAssistantChat = action.payload.aiAssistantChat;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getAllChats.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAllChats.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(getChat.fulfilled, (state, action) => {
            const membersId = state.chats
                .find((chat) => chat.id === action.payload.id)
                ?.users.map((user) => user.id) as number[];

            state.currentChat = { ...action.payload, membersId };
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getChat.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getChat.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addMatcher(
            isAnyOf(sendMessage.fulfilled, applyMessage.fulfilled),
            (state, action) => {
                const message = action.payload;

                if (state.currentChat && message) {
                    const chat = state.chats.find(
                        (chat) => chat.id === message.chatId,
                    ) as ChatPreviewResponseDto;

                    chat.lastMessage = message;

                    if (state.currentChat.id === chat.id) {
                        state.currentChat.messages = [
                            message,
                            ...state.currentChat.messages,
                        ];
                    }
                }
            },
        );
    },
});

export { type State, actions, name, reducer };
