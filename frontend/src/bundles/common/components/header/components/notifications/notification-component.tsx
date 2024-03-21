import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useHandleClickOutside,
    useLocation,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    deleteNotification,
    dismissNotification,
    fetchNotifications,
} from '~/bundles/notifications/store/actions.js';
import { notificationManager } from '~/framework/notification/notification.js';

import { NotificationBell, NotificationList } from './components/components.js';
import { NOTIFICATION_ERROR_MESSAGE } from './constants/notification-error-message.js';

const NotificationComponent = (): JSX.Element => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { notifications, dataStatus } = useAppSelector(
        ({ notifications }) => notifications,
    );

    const isLoading = dataStatus === DataStatus.PENDING;
    const hasError = dataStatus === DataStatus.REJECTED;

    useEffect(() => {
        setShowList(false);
    }, [location.pathname]);

    useEffect(() => {
        void dispatch(fetchNotifications());
    }, [dispatch]);

    useEffect(() => {
        if (hasError) {
            notificationManager.error(NOTIFICATION_ERROR_MESSAGE);
        }
    }, [dispatch, hasError]);

    const [showList, setShowList] = useState(false);

    const handleIconClick = useCallback(() => {
        setShowList(!showList);
    }, [showList]);

    const handleNotificationReadClick = useCallback(
        (id: number) => {
            void dispatch(dismissNotification(id));
        },
        [dispatch],
    );

    const handleNotificationDeleteClick = useCallback(
        (id: number) => {
            void dispatch(deleteNotification(id));
        },
        [dispatch],
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
                isLoading={isLoading}
            />
            {showList && (
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
