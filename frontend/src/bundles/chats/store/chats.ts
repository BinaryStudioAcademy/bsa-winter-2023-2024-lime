import { getAllChats, getChat, joinRoom, leaveRoom } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllChats,
    getChat,
    joinRoom,
    leaveRoom,
};

export { allActions as actions };
export { reducer } from './slice.js';
