import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
    type ChatFullResponseDto,
    type ChatGetAllItemsResponseDto,
    type ChatRequestDto,
    type ChatResponseDto,
    type MessageRequestDto,
    type MessageResponseDto,
} from '~/bundles/chats/types/types.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type DeleteChatMessagesRequestDto } from '~/bundles/messages/types/types.js';
import { notificationManager } from '~/framework/notification/notification.js';

import { name as sliceName } from './slice.js';

const getAllChats = createAsyncThunk<
    ChatGetAllItemsResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (_, { extra }) => {
    const { chatsApi } = extra;

    return await chatsApi.getAllChats();
});

const getChat = createAsyncThunk<
    ChatFullResponseDto,
    Record<'chatId', string>,
    AsyncThunkConfig
>(`${sliceName}/get-chat`, async (payload, { extra: { chatsApi } }) => {
    const { chatId } = payload;

    return await chatsApi.getChat(chatId);
});

const createChat = createAsyncThunk<
    ChatResponseDto,
    ChatRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-chat`, async (payload, { extra: { chatsApi } }) => {
    return await chatsApi.createChat(payload);
});

const applyChat = createAsyncThunk<
    ChatResponseDto | null,
    ChatResponseDto,
    AsyncThunkConfig
>(`${sliceName}/apply-chat`, (payload, { getState }) => {
    const { creatorId } = payload;

    const {
        auth: { user },
    } = getState();

    if (user && user.id === creatorId) {
        return null;
    }

    return payload;
});

const joinRoom = createAction<(userId: number) => Record<'payload', number>>(
    `${sliceName}/join-room`,
    (userId) => {
        return {
            payload: userId,
        };
    },
);

const leaveRoom = createAction<(userId: number) => Record<'payload', number>>(
    `${sliceName}/leave-room`,
    (userId) => {
        return {
            payload: userId,
        };
    },
);

const deleteChatHistory = createAsyncThunk<
    boolean,
    DeleteChatMessagesRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/delete-chat-history`,
    async (payload, { extra: { messageApi } }) => {
        const result = await messageApi.delete(payload);
        if (result) {
            notificationManager.success('Your chat history is deleted');
        }

        return result;
    },
);

const sendMessage = createAsyncThunk<
    MessageResponseDto | undefined,
    MessageRequestDto,
    AsyncThunkConfig
>(`${sliceName}/send-message`, async (payload, { extra: { messageApi } }) => {
    return await messageApi.send(payload);
});

const applyMessage = createAsyncThunk<
    MessageResponseDto | null,
    MessageResponseDto,
    AsyncThunkConfig
>(`${sliceName}/apply-message`, (payload, { getState }) => {
    const { senderId } = payload;

    const {
        auth: { user },
    } = getState();

    if (user && user.id === senderId) {
        return null;
    }

    return payload;
});

const generateAiAssistantResponse = createAsyncThunk<
    MessageResponseDto,
    MessageRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/send-ai-message`,
    async (payload, { extra: { aiAssistantApi } }) => {
        return await aiAssistantApi.generateResponse(payload);
    },
);

export {
    applyChat,
    applyMessage,
    createChat,
    deleteChatHistory,
    generateAiAssistantResponse,
    getAllChats,
    getChat,
    joinRoom,
    leaveRoom,
    sendMessage,
};
