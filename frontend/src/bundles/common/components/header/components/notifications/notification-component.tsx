import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useHandleClickOutside,
    useMemo,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { createSelector } from '~/bundles/common/redux/selectors/selectors.js';
import { type RootState } from '~/bundles/common/types/types.js';
import { actions } from '~/bundles/notifications/store/notifications.js';

import { NotificationList } from './components/notification-list.js';
import { NotificationBell } from './components/notifications-bell.js';

const selectNotifications = (state: RootState): RootState['notifications'] =>
    state.notifications;

const NotificationComponent = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const selectorNotifications = useMemo(
        () =>
            createSelector([selectNotifications], (notifications) => ({
                notifications: notifications.notifications,
                loading: notifications.isRefreshing,
            })),
        [],
    );

    const { notifications, loading } = useAppSelector(selectorNotifications);

    useEffect(() => {
        // void dispatch(fetchNotifications());
        dispatch(actions.localFetchNotifications([]));
    }, [dispatch]);

    const [showList, setShowList] = useState(false);

    const handleIconClick = useCallback(() => {
        setShowList(!showList);
    }, [showList]);

    const handleNotificationReadClick = useCallback(
        (id: number) => {
            // void dispatch(dismissNotification(id.toString()));
            void dispatch(actions.localDismissNotification(id.toString()));
            if (notifications.length > 1) {
                setShowList(true);
            }
        },
        [dispatch, notifications],
    );

    const handleNotificationDeleteClick = useCallback(
        (id: number) => {
            // void dispatch(deleteNotification(id.toString()));
            void dispatch(actions.localDeleteNotification(id.toString()));
            if (notifications.length > 1) {
                setShowList(true);
            }
        },
        [dispatch, notifications],
    );

    const notificationListReference = useRef(null);

    const count = notifications.filter(
        (notification) => !notification.isRead,
    ).length;

    useHandleClickOutside({
        ref: notificationListReference,
        onClick: () => setShowList(false),
    });

    return (
        <div className="relative" ref={notificationListReference}>
            <NotificationBell
                count={count}
                onClick={handleIconClick}
                showList={showList}
            />
            {showList && !loading && (
                <NotificationList
                    notifications={notifications}
                    onNotificationReadClick={handleNotificationReadClick}
                    onNotificationDeleteClick={handleNotificationDeleteClick}
                />
            )}
        </div>
    );
};

export { NotificationComponent };
