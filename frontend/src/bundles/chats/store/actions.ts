import { createAction } from '@reduxjs/toolkit';

import { name as sliceName } from './slice.js';

const joinRoom = createAction<(userId: number) => Record<'payload', number>>(
    `${sliceName}/join-room`,
    (userId) => {
        return {
            payload: userId,
        };
    },
);

const leaveRoom = createAction<(userId: number) => Record<'payload', number>>(
    `${sliceName}/leave-room`,
    (userId) => {
        return {
            payload: userId,
        };
    },
);

export { joinRoom, leaveRoom };
