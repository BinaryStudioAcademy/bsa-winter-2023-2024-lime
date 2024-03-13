import {
    addFollowing,
    getFollowings,
    getNotFollowed,
    removeFollowing,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getFollowings,
    getNotFollowed,
    addFollowing,
    removeFollowing,
};

export { allActions as actions };
export { reducer } from './slice.js';
