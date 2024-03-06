import { useState } from '~/bundles/common/hooks/hooks.js';
import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

import { NotificationActions } from './notification-actions.js';
import { NotificationDisplay } from './notification-display.js';

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
    const [isOpened, setIsOpened] = useState<number | null>(null);
    return (
        <div className="bg-secondary text-primary absolute right-0 flex w-52 flex-col shadow-lg">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <>
                        <NotificationActions
                            notification={notification}
                            onRead={onNotificationReadClick}
                            onDelete={onNotificationDeleteClick}
                            setIsOpened={setIsOpened}
                        >
                            <NotificationDisplay
                                notification={notification}
                                isOpened={isOpened === notification.id}
                            />
                        </NotificationActions>
                    </>
                ))
            ) : (
                <p className="bg-primary text-primary border-buttonTertiary rounded border p-2 text-center text-sm">
                    There are no notifications
                </p>
            )}
        </div>
    );
};

export { NotificationList };
