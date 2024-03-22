import {
    addFollowing,
    addFollowingFollower,
    getFollowers,
    getFollowings,
    getNotFollowed,
    loadMoreFollowers,
    loadMoreFollowings,
    loadMoreNotFollowed,
    removeFollowing,
    removeFollowingFollower,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getFollowings,
    getNotFollowed,
    getFollowers,
    addFollowing,
    removeFollowing,
    loadMoreFollowings,
    loadMoreNotFollowed,
    loadMoreFollowers,
    addFollowingFollower,
    removeFollowingFollower,
};

export { allActions as actions };
export { reducer } from './slice.js';
