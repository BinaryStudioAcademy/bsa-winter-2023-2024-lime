import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    type ChatFullResponseDto,
    type ChatPreviewResponseDto,
} from '~/bundles/chats/types/types.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    applyChat,
    applyMessage,
    createChat,
    deleteChatHistory,
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
    deleteChatDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    chats: [],
    aiAssistantChat: null,
    currentChat: null,
    dataStatus: DataStatus.IDLE,
    createChatDataStatus: DataStatus.IDLE,
    deleteChatDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chats',
    reducers: {
        clearCurrentChat(state) {
            state.currentChat = null;
        },
    },
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
        builder.addCase(deleteChatHistory.fulfilled, (state, action) => {
            if (action.payload) {
                (state.currentChat as ChatFullResponseDto).messages = [];

                (state.aiAssistantChat as ChatPreviewResponseDto).lastMessage =
                    null;
            }
            state.deleteChatDataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(deleteChatHistory.pending, (state) => {
            state.deleteChatDataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteChatHistory.rejected, (state) => {
            state.deleteChatDataStatus = DataStatus.REJECTED;
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

            if (!isAssistant) {
                state.currentChat = { ...newChat, messages: [] };
            }

            state.createChatDataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(createChat.pending, (state) => {
            state.createChatDataStatus = DataStatus.PENDING;
        });
        builder.addCase(createChat.rejected, (state) => {
            state.createChatDataStatus = DataStatus.REJECTED;
        });
        builder.addCase(applyChat.fulfilled, (state, action) => {
            if (action.payload) {
                const newChat = {
                    ...action.payload,
                    lastMessage: null,
                };

                state.chats = [...state.chats, newChat];
            }
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

                if (!currentChat && incomingMessage) {
                    const chat = chats.find(
                        ({ id }) => id === incomingMessage.chatId,
                    );

                    (chat as ChatPreviewResponseDto).lastMessage =
                        incomingMessage;
                }
            },
        );
    },
});

export { type State, actions, name, reducer };
