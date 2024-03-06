import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

import { NotificationItem } from './notification-item.js';

type Properties = {
    notifications: NotificationResponseDto[];
    onNotificationReadClick: (index: number) => void;
    onNotificationDeleteClick: (index: number) => void;
};

const NotificationList = ({
    notifications,
    onNotificationReadClick,
    onNotificationDeleteClick,
}: Properties): JSX.Element => {
    return (
        <div className="bg-secondary text-primary absolute right-0 flex w-52 flex-col shadow-lg">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <NotificationItem
                        notification={notification}
                        onDelete={onNotificationDeleteClick}
                        onRead={onNotificationReadClick}
                        key={notification.id}
                    />
                ))
            ) : (
                <p className="bg-primary text-primary border-buttonTertiary rounded border p-2 text-sm">
                    There are no notifications
                </p>
            )}
        </div>
    );
};

export { NotificationList };
