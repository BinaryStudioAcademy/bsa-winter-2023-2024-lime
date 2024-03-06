import {
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { reducer as appReducer } from '~/app/store/app.js';
import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as themeReducer } from '~/bundles/common/store/slice.js';
import { passwordResetApi } from '~/bundles/password-reset/password-reset.js';
import { reducer as passwordResetReducer } from '~/bundles/password-reset/store/password-reset.js';
import { reducer as subscriptionsReducer } from '~/bundles/subscription/store/slice.js';
import {
    subscriptionApi,
    subscriptionPlansApi,
} from '~/bundles/subscription/subscription.js';
import { reducer as usersReducer } from '~/bundles/users/store/users.js';
import { userApi } from '~/bundles/users/users.js';
import { type Config } from '~/framework/config/config.js';

import {
    chatSocketMiddleware,
    errorMiddleware,
} from './middlewares/middlewares.js';

type RootReducer = {
    app: ReturnType<typeof appReducer>;
    auth: ReturnType<typeof authReducer>;
    passwordReset: ReturnType<typeof passwordResetReducer>;
    users: ReturnType<typeof usersReducer>;
    subscriptions: ReturnType<typeof subscriptionsReducer>;
    theme: ReturnType<typeof themeReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    subscriptionPlansApi: typeof subscriptionPlansApi;
    subscriptionApi: typeof subscriptionApi;
    passwordResetApi: typeof passwordResetApi;
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
                app: appReducer,
                auth: authReducer,
                passwordReset: passwordResetReducer,
                users: usersReducer,
                subscriptions: subscriptionsReducer,
                theme: themeReducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                })
                    .prepend(errorMiddleware)
                    .concat(chatSocketMiddleware), // eslint-disable-line unicorn/prefer-spread
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            subscriptionApi,
            subscriptionPlansApi,
            passwordResetApi,
        };
    }
}

export { Store };
