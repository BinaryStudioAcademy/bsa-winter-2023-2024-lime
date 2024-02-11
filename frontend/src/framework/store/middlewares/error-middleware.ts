import { type Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

import {
    NotificationStatus,
    notify,
} from '~/framework/services/notification-service/notification.service.js';

const errorMiddleware: Middleware = () => {
    return (next) => {
        return (action) => {
            if (isRejectedWithValue(action)) {
                const { message = 'Something went wrong' } = action.error;

                notify({
                    message: message,
                    status: NotificationStatus.Error,
                });
            }

            next(action);
        };
    };
};

export { errorMiddleware };
