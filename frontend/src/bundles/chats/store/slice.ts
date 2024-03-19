import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    type ChatFullResponseDto,
    type ChatPreviewResponseDto,
} from '~/bundles/chats/types/types.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    applyMessage,
    createChat,
    generateAiAssistantResponse,
    getAllChats,
    getChat,
    sendMessage,
} from './actions.js';

type State = {
    chats: ChatPreviewResponseDto[];
    aiAssistantChat: ChatPreviewResponseDto | null;
    currentChat: ChatFullResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
    createChatDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    chats: [],
    aiAssistantChat: null,
    currentChat: null,
    dataStatus: DataStatus.IDLE,
    createChatDataStatus: DataStatus.IDLE,
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
        builder.addCase(createChat.fulfilled, (state, action) => {
            const { isAssistant } = action.payload;

            const newChat = {
                ...action.payload,
                lastMessage: null,
            };

            !state.aiAssistantChat && isAssistant
                ? (state.aiAssistantChat = newChat)
                : (state.chats = [...state.chats, newChat]);

            state.createChatDataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(createChat.pending, (state) => {
            state.createChatDataStatus = DataStatus.PENDING;
        });
        builder.addCase(createChat.rejected, (state) => {
            state.createChatDataStatus = DataStatus.REJECTED;
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

                    const isAssistantChatMessage =
                        isAssistant && currentChatId === incomingMessage.chatId;

                    const chat = isAssistantChatMessage
                        ? aiAssistantChat
                        : chats.find(({ id }) => id === incomingMessage.chatId);

                    (chat as ChatPreviewResponseDto).lastMessage =
                        incomingMessage;

                    if (currentChatId === (chat as ChatPreviewResponseDto).id) {
                        currentChat.messages = [incomingMessage, ...messages];
                    }
                }
            },
        );
    },
});

export { type State, actions, name, reducer };
