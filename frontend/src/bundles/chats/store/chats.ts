import {
    applyMessage,
    createChat,
    generateAiAssistantResponse,
    getAllChats,
    getChat,
    joinRoom,
    leaveRoom,
    sendMessage,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllChats,
    getChat,
    createChat,
    joinRoom,
    leaveRoom,
    sendMessage,
    applyMessage,
    generateAiAssistantResponse,
};

export { allActions as actions };
export { reducer } from './slice.js';