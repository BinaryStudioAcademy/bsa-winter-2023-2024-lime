import {
    addFollowing,
    getFollowings,
    getNotFollowed,
    loadMoreFollowings,
    loadMoreNotFollowed,
    removeFollowing,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getFollowings,
    getNotFollowed,
    addFollowing,
    removeFollowing,
    loadMoreFollowings,
    loadMoreNotFollowed,
};

export { allActions as actions };
export { reducer } from './slice.js';
