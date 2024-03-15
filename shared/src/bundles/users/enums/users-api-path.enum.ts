const UsersApiPath = {
    ROOT: '/',
    CURRENT: '/current',
    UPDATE_USER: '/update',
    GET_BY_ID: '/:id',
    CURRENT_BONUSES: '/current-bonuses',
    NOT_FOLLOWED: '/not-followed',
    FOLLOWINGS: '/followings',
    FOLLOWERS: '/followers',
} as const;

export { UsersApiPath };
