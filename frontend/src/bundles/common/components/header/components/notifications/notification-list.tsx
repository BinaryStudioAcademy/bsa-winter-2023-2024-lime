import { useCallback } from 'react';

import { type NotificacitionType } from './enums/notifications.enums.js';

type Properties = {
    notifications: Array<NotificacitionType>;
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
        <div className="absolute right-0 flex w-52 flex-col text-white shadow-lg">
            {notifications.map((notification, index) => (
                <div
                    className="border-lm-yellow-200 relative w-full rounded border "
                    key={notification.id}
                >
                    <button
                        key={index}
                        data-index={notification.id}
                        onClick={handleClick}
                        type="button"
                        className="bg-lm-black-100 hover:bg-lm-black-200 hover:rounded-s-34 font-heavybold absolute right-1 top-1 h-4 w-4 text-xs transition-all"
                    >
                        X
                    </button>
                    <details>
                        <summary className=" bg-lm-black-100 flex cursor-pointer items-center justify-center p-2 transition-all">
                            {notification.title}
                        </summary>
                        <p className="bg-lm-black-100 p-4">
                            {notification.description}
                        </p>
                    </details>
                </div>
            ))}
        </div>
    );
};

export { NotificationList };
