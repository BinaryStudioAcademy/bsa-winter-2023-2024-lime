import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    type ChatPreviewResponseDto,
    type CurrentChatDto,
} from '~/bundles/chats/types/types.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    applyMessage,
    generateAiAssistantResponse,
    getAllChats,
    getChat,
    sendMessage,
} from './actions.js';

type State = {
    chats: ChatPreviewResponseDto[];
    aiAssistantChat: ChatPreviewResponseDto | null;
    currentChat: CurrentChatDto | null;
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
            state.currentChat = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getChat.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getChat.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(generateAiAssistantResponse.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(generateAiAssistantResponse.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addMatcher(
            isAnyOf(
                sendMessage.fulfilled,
                applyMessage.fulfilled,
                generateAiAssistantResponse.fulfilled,
            ),
            (state, action) => {
                const incomingMessage = action.payload;

                const { currentChat, chats, aiAssistantChat } = state;

                if (currentChat && incomingMessage) {
                    const {
                        messages,
                        isAssistant,
                        id: currentChatId,
                    } = currentChat;

                    const chat =
                        isAssistant && currentChatId === incomingMessage.chatId
                            ? (aiAssistantChat as ChatPreviewResponseDto)
                            : (chats.find(
                                  (chat) => chat.id === incomingMessage.chatId,
                              ) as ChatPreviewResponseDto);

                    chat.lastMessage = incomingMessage;

                    if (currentChatId === chat.id) {
                        currentChat.messages = [incomingMessage, ...messages];
                    }
                }
            },
        );
    },
});

export { type State, actions, name, reducer };
