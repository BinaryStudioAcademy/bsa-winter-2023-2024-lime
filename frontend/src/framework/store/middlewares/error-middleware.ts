import { type Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

import { notificationManager } from '~/framework/notification/notification.js';

const errorMiddleware: Middleware = () => {
    return (next) => {
        return (action) => {
            if (isRejectedWithValue(action)) {
                const { message = 'Something went wrong' } = action.error;

                notificationManager.error(message);
            }

            next(action);
        };
    };
};

export { errorMiddleware };
