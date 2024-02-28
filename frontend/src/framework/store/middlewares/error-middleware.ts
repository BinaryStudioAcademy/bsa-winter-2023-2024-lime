import { type Middleware, isRejected } from '@reduxjs/toolkit';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { UserValidationMessage } from '~/bundles/users/users.js';
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
                const { message = 'Something went wrong' } = action.error;

                if (message === UserValidationMessage.TOKEN_INVALID) {
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
