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
    const {
        notifications: { items }
    } = useAppSelector(({ notifications }) => notifications);

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

    useHandleClickOutside({
        ref: notificationListReference,
        onClick: () => setShowList(false),
    });

    const countUnread = items.filter((item) => !item.isRead).length;

    return (
        <div className="relative" ref={notificationListReference}>
            <NotificationBell
                count={countUnread}
                onClick={handleIconClick}
                showList={showList}
            />
            {showList && (
                <NotificationList
                    notifications={items}
                    onNotificationReadClick={handleNotificationReadClick}
                    onNotificationDeleteClick={handleNotificationDeleteClick}
                />
            )}
        </div>
    );
};

export { NotificationComponent };
