import { type Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

import { notificationManager } from '~/framework/services/notification-service/notification.service.js';

const errorMiddleware: Middleware = () => {
    return (next) => {
        return (action) => {
            if (isRejectedWithValue(action)) {
                const { message = 'Something went wrong' } = action.error;

                notificationManager.errorNotify(message);
            }

            next(action);
        };
    };
};

export { errorMiddleware };
