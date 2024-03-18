const AchievementsApiPath = {
    ROOT: '/',
    ACHIEVEMENT_ID: '/:id',
    USER_ID: '/user/:id',
    CURRENT_USER: '/current-user-achievements',
} as const;

export { AchievementsApiPath };
