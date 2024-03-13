import { joinRoom, leaveRoom } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    joinRoom,
    leaveRoom,
};

export { allActions as actions };
export { reducer } from './slice.js';
