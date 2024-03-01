import { type AuthStateTypeSlice } from '~/bundles/auth/types/types.js';
import { type PasswordResetStateTypeSlice } from '~/bundles/password-reset/types/types.js';
import { type SubscripcionsStateTypeSlice } from '~/bundles/subscription/types/types.js';
import { type UsersStateTypeSlice } from '~/bundles/users/types/users-state-type-slice.js';

import { type ThemeStateTypeSlice } from './theme-state-type-slice.js';

type RootState = {
    subscriptions: SubscripcionsStateTypeSlice;
    app: {
        redirectPath: string | null;
    };
    auth: AuthStateTypeSlice;
    passwordReset: PasswordResetStateTypeSlice;
    users: UsersStateTypeSlice;
    theme: ThemeStateTypeSlice;
};

export { type RootState };
