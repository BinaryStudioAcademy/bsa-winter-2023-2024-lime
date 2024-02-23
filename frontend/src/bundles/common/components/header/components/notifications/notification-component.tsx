import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { NotificationList } from './notification-list.js';
import { NotificationIcon } from './notifications-header.js';

const NotificationComponent = (): JSX.Element => {
    const [notifications, setNotifications] = useState([
        'Notification 1',
        'Notification 2',
    ]);
    const [showList, setShowList] = useState(false);

    const handleIconClick = useCallback(() => {
        setShowList(!showList);
    }, [showList]);

    const handleNotificationClick = useCallback(
        (index: number) => {
            setNotifications(
                notifications.filter(
                    (_: string, indexNotifications: number) =>
                        indexNotifications !== index,
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
