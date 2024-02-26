import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { NotificationList } from './notification-list.js';
import { NotificationIcon } from './notifications-header.js';

const NotificationComponent = (): JSX.Element => {
    const [notifications, setNotifications] = useState([
        {
            id: '202404',
            title: 'Notification 1',
            description: 'This is a description of the notification 1',
        },
        {
            id: '202401',
            title: 'Notification 2',
            description: 'This is a description of the notification 1',
        },
    ]);
    const [showList, setShowList] = useState(false);

    const handleIconClick = useCallback(() => {
        setShowList(!showList);
    }, [showList]);

    const handleNotificationClick = useCallback(
        (id: number) => {
            setNotifications(
                notifications.filter(
                    (notification) =>
                        notification.id.toString() !== id.toString(),
                ),
            );
            setShowList(notifications.length > 1);
        },
        [notifications],
    );

    return (
        <div className="relative">
            <NotificationIcon
                count={notifications.length}
                onClick={handleIconClick}
                showList={showList}
            />
            {showList && (
                <NotificationList
                    notifications={notifications}
                    onNotificationClick={handleNotificationClick}
                />
            )}
        </div>
    );
};

export { NotificationComponent };
