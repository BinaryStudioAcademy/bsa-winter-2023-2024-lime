import {
    addFollowing,
    getFollowings,
    getNotFollowed,
    loadMore,
    removeFollowing,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getFollowings,
    getNotFollowed,
    addFollowing,
    removeFollowing,
    loadMore,
};

export { allActions as actions };
export { reducer } from './slice.js';
