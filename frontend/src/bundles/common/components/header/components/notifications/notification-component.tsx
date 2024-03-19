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
import { fetchNotifications } from '~/bundles/notifications/store/actions.js';
import { notificationManager } from '~/framework/notification/notification.js';

import { ERROR_NOTIFICATION_API } from '../constants/error-notification-api.js';
import { NotificationBell, NotificationList } from './components/components.js';

const NotificationComponent = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const [showList, setShowList] = useState(false);
    const notificationListReference = useRef(null);
    const {
        notifications: { items },
        dataStatus,
    } = useAppSelector(({ notifications }) => notifications);

    useEffect(() => {
        void dispatch(fetchNotifications());
    }, [dispatch]);

    const loading = dataStatus === DataStatus.PENDING;

    const handleIconClick = useCallback(() => {
        setShowList(!showList);
    }, [showList]);

    const hasError = dataStatus === DataStatus.REJECTED;

    useEffect(() => {
        if (hasError) {
            notificationManager.error(ERROR_NOTIFICATION_API);
        }
    }, [hasError]);

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
                loading={loading}
            />
            {showList && <NotificationList notifications={items} />}
        </div>
    );
};

export { NotificationComponent };
