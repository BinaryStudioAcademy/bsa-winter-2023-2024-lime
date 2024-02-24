import {
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { achievementsApi } from '~/bundles/achievements/achievements.js';
import { reducer as achievementsReducer } from '~/bundles/achievements/store/achievements.js';
import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { goalsApi } from '~/bundles/goals/goals.js';
import { reducer as goalsReducer } from '~/bundles/goals/store/goals.js';
import { reducer as usersReducer } from '~/bundles/users/store/users.js';
import { userApi } from '~/bundles/users/users.js';
import { type Config } from '~/framework/config/config.js';

import { errorMiddleware } from './middlewares/error-middleware.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
    goals: ReturnType<typeof goalsReducer>;
    achievements: ReturnType<typeof achievementsReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    goalsApi: typeof goalsApi;
    achievementsApi: typeof achievementsApi;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            UnknownAction,
            Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
        >
    >;

    public constructor(config: Config) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: {
                auth: authReducer,
                users: usersReducer,
                goals: goalsReducer,
                achievements: achievementsReducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                }).prepend(errorMiddleware),
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            goalsApi,
            achievementsApi,
        };
    }
}

export { Store };
