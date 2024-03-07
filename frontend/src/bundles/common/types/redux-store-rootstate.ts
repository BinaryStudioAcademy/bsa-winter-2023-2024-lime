import { type AuthStateTypeSlice } from '~/bundles/auth/types/types.js';
import { type PasswordResetStateTypeSlice } from '~/bundles/password-reset/types/types.js';
import { type SubscripcionsStateTypeSlice } from '~/bundles/subscription/types/types.js';
import { type UsersStateTypeSlice } from '~/bundles/users/types/types.js';
import { type WorkoutStateTypeSlice } from '~/bundles/workouts/types/types.js';

import { type ThemeStateTypeSlice } from './types.js';

type RootState = {
    subscriptions: SubscripcionsStateTypeSlice;
    app: {
        redirectPath: string | null;
    };
    auth: AuthStateTypeSlice;
    passwordReset: PasswordResetStateTypeSlice;
    users: UsersStateTypeSlice;
    theme: ThemeStateTypeSlice;
    workouts: WorkoutStateTypeSlice;
};

export { type RootState };
