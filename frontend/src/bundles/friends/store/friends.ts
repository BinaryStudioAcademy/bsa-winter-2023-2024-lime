import { addFollowing, getFollowings, removeFollowing } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getFollowings,
    addFollowing,
    removeFollowing,
};

export { allActions as actions };
export { reducer } from './slice.js';
