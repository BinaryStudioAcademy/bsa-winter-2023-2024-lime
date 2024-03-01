import { type Middleware, isRejected } from '@reduxjs/toolkit';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { type HttpError, HttpCode } from '~/framework/http/http.js';
import { notificationManager } from '~/framework/notification/notification.js';

import { type store } from '../store.js';

const errorMiddleware: Middleware = ({
    dispatch,
}: {
    dispatch: typeof store.instance.dispatch;
}) => {
    return (next) => {
        return async (action) => {
            if (isRejected(action)) {
                const { message = 'Something went wrong', status } =
                    action.error as HttpError;

                if (status === HttpCode.UNAUTHORIZED) {
                    await dispatch(authActions.logout());
                    return;
                } else {
                    notificationManager.error(message);
                }
            }

            next(action);
        };
    };
};

export { errorMiddleware };
