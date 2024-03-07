import { type RootState } from '~/bundles/common/types/types.js';

export { createSelector } from '@reduxjs/toolkit';

const selectTheme = (state: RootState): RootState['theme'] => state.theme;

const selectPasswordReset = (state: RootState): RootState['passwordReset'] =>
    state.passwordReset;

const selectAuth = (state: RootState): RootState['auth'] => state.auth;

const selectSubscriptions = (state: RootState): RootState['subscriptions'] =>
    state.subscriptions;

const selectRedirectPath = (state: RootState): RootState['app'] => state.app;

const selectWorkouts = (state: RootState): RootState['workouts'] =>
    state.workouts;

export {
    selectAuth,
    selectPasswordReset,
    selectRedirectPath,
    selectSubscriptions,
    selectTheme,
    selectWorkouts,
};
