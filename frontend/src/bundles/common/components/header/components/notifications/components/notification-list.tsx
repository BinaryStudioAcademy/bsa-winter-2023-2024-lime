import { Popover } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { type NotificationType } from '../types/notifications.types.js';

type Properties = {
    notifications: Array<NotificationType>;
    onNotificationClick: (index: number) => void;
};

const NotificationList = ({
    notifications,
    onNotificationClick,
}: Properties): JSX.Element => {
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const index = Number(event.currentTarget.dataset['index']);
            onNotificationClick(index);
        },
        [onNotificationClick],
    );
    return (
        <div className="bg-secondary rounded-34 text-primary absolute right-0 flex w-52 flex-col shadow-lg">
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <Popover
                        className="border-buttonTertiary bg-primary relative w-full rounded border text-sm"
                        content={<></>}
                        key={notification.id}
                    >
                        <details className="w-full">
                            <summary className=" flex cursor-pointer items-center justify-center p-2 transition-all">
                                {notification.title}
                            </summary>
                            <p className="p-4">{notification.description}</p>
                        </details>
                        <button
                            key={index}
                            data-index={notification.id}
                            onClick={handleClick}
                            type="button"
                            className=" hover:bg-lm-black-200 hover:rounded-s-34 font-heavybold absolute right-1 top-1 h-4 w-4 text-xs transition-all"
                        >
                            X
                        </button>
                    </Popover>
                ))
            ) : (
                <p className="bg-primary text-primary border-buttonTertiary rounded border p-4 text-sm">
                    There are no notifications
                </p>
            )}
        </div>
    );
};

export { NotificationList };
