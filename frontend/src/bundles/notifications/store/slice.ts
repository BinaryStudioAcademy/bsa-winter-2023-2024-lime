import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';

import { NotificationType } from '../temp-types/types.js';
import { type NotificationStateTypeSlice } from '../types/types.js';
import {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
} from './actions.js';

const State: NotificationStateTypeSlice = {
    notifications: [
        {
            id: 202_404,
            title: 'Welcome to LIME! ',
            message:
                'Since you are new here, we would like to welcome you to LIME! in case of any questions, feel free to ask us. We are here to help you!',
            isRead: false,
            type: NotificationType.DEFAULT,
        },
        {
            id: 202_401,
            title: 'Set your user profile! 🏋️',
            message:
                'This will help us to provide you with the best experience possible. You can set your profile by clicking on the gear icon ⚙️ on the top right corner of the page.',
            isRead: false,
            type: NotificationType.DEFAULT,
        },
        {
            id: 202_402,
            title: 'Check out our new features! 🎉',
            message:
                'We have added new features to LIME! Check them out and let us know what you think!',
            isRead: false,
            type: NotificationType.DEFAULT,
        },
        {
            id: 202_403,
            title: 'How to dissmiss a notification! 🤝',
            message:
                'You can dismiss a notification by clicking on the "x" button on the top right corner of the notification.',
            isRead: false,
            type: NotificationType.DEFAULT,
        },
    ],
    dataStatus: DataStatus.IDLE,
    isRefreshing: false,
};

const { reducer, actions, name } = createSlice({
    initialState: State,
    name: 'notifications',
    reducers: {
        localFetchNotifications: (state, action) => {
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    ...action.payload,
                ],
            };
            }
        ,       
        localDismissNotification: (state, action) => {
            return {
                ...state,
                notifications: state.notifications.map((notification) => {
                    if (notification.id.toString() === action.payload) {
                        return {
                            ...notification,
                            isRead: true,
                        };
                    }
                    return notification;
                }),
            };
            },        
        localDeleteNotification: (state, action) => {
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.id.toString() !== action.payload,
                ),
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            return {
                ...state,
                notifications: action.payload,
                dataStatus: DataStatus.FULFILLED,
            };
        });
        builder.addCase(fetchNotifications.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(createNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(createNotification.fulfilled, (state, action) => {
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        });
        builder.addCase(createNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(dismissNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });        
        builder.addCase(dismissNotification.fulfilled, (state, action) => {
            return {
                ...state,
                notifications: state.notifications.map((notification) => {
                    if (notification.id.toString() === action.payload) {
                        return {
                            ...notification,
                            isRead: true,
                        };
                    }
                    return notification;
                }),
            };
        });
        builder.addCase(dismissNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(deleteNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteNotification.fulfilled, (state, action) => {
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.id.toString() !== action.payload,
                ),
            };
        });
        builder.addCase(deleteNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
