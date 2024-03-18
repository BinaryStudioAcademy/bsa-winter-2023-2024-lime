import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
    type ChatFullResponseDto,
    type ChatGetAllItemsResponseDto,
} from '~/bundles/chats/types/types.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

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
    { chatId: string },
    AsyncThunkConfig
>(`${sliceName}/get-chat`, async (payload, { extra: { chatsApi } }) => {
    const { chatId } = payload;

    return await chatsApi.getChat(chatId);
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

export { getAllChats, getChat, joinRoom, leaveRoom };
