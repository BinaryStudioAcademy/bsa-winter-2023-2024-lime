import { type Middleware } from '@reduxjs/toolkit';

import { actions as chatActionCreator } from '~/bundles/chat/store/chat.js';
import {
    SocketEvent,
    SocketNamespace,
} from '~/framework/socket/enums/enums.js';
import { socket } from '~/framework/socket/socket.js';

import { type AppDispatch } from '../types/types.js';

const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

const chatSocketMiddleware: Middleware<unknown, unknown, AppDispatch> = () => {
    return (next) => (action) => {
        // eslint-disable-next-line unicorn/prefer-regexp-test
        if (chatActionCreator.joinRoom.match(action)) {
            chatSocketInstance.emit(
                SocketEvent.CHAT_JOIN_ROOM,
                `${action.payload}`,
            );
        }

        // eslint-disable-next-line unicorn/prefer-regexp-test
        if (chatActionCreator.leaveRoom.match(action)) {
            chatSocketInstance.emit(
                SocketEvent.CHAT_LEAVE_ROOM,
                `${action.payload}`,
            );
        }

        return next(action);
    };
};

export { chatSocketMiddleware };
