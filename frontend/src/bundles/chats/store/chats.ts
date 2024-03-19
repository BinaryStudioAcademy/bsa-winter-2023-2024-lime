import { applyMessage,getAllChats, getChat, joinRoom, leaveRoom, sendMessage } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllChats,
    getChat,
    joinRoom,
    leaveRoom,
    sendMessage,
    applyMessage
    
};

export { allActions as actions };
export { reducer } from './slice.js';
