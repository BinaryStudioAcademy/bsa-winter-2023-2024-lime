import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useHandleClickOutside,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    deleteNotification,
    dismissNotification,
    fetchNotifications,
} from '~/bundles/notifications/store/actions.js';

import { NotificationBell, NotificationList } from './components/components.js';

const NotificationComponent = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { notifications, dataStatus } = useAppSelector(
        ({ notifications }) => notifications,
    );

    const isLoading = dataStatus === DataStatus.PENDING;

    useEffect(() => {
        void dispatch(fetchNotifications());
    }, [dispatch]);

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

    const count = notifications?.filter(
        (notification) => !notification.isRead,
    ).length;

    useHandleClickOutside({
        ref: notificationListReference,
        onClick: () => setShowList(false),
    });

    return (
        <div className="relative" ref={notificationListReference}>
            <NotificationBell
                count={isLoading ? 0 : count || 0}
                onClick={handleIconClick}
                showList={showList}
            />
            {showList && !isLoading && (
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
