import { addFriend, getFriends, removeFriend } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getFriends,
    addFriend,
    removeFriend,
};

export { allActions as actions };
export { reducer } from './slice.js';
