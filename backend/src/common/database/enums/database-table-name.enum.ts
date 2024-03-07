const DatabaseTableName = {
    MIGRATIONS: 'migrations',
    USERS: 'users',
    USER_DETAILS: 'user_details',
    GOALS: 'goals',
    NOTIFICATIONS: 'notifications',
    SUBSCRIPTION_PLANS: 'subscription_plans',
    SUBSCRIPTIONS: 'subscriptions',
    OAUTH_INFO: 'oauth_info',
    OAUTH_STATE: 'oauth_state',
    ACHIEVEMENTS: 'achievements',
    USER_ACHIEVEMENTS: 'user_achievements',
    WORKOUTS: 'workouts',
} as const;

export { DatabaseTableName };
