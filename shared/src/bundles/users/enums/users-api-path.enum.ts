const UsersApiPath = {
    ROOT: '/',
    CURRENT: '/current',
    UPDATE_USER: '/update',
    GET_BY_ID: '/:id',
    CURRENT_BONUSES: '/current-bonuses',
    BUY_WITH_BONUSES: '/buy-with-bonuses',
    UPLOAD_AVATAR: '/upload',
} as const;

export { UsersApiPath };
