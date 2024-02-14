import { type Middleware, isRejected } from '@reduxjs/toolkit';

import { notificationManager } from '~/framework/notification/notification.js';

const errorMiddleware: Middleware = () => {
    return (next) => {
        return (action) => {
            if (isRejected(action)) {
                const { message = 'Something went wrong' } = action.error;

                notificationManager.error(message);
            }

            next(action);
        };
    };
};

export { errorMiddleware };
