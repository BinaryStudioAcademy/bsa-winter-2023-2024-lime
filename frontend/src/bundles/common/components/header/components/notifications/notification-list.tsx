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
        <div className="bg-lm-black-100 absolute right-0 flex w-52 flex-col items-center justify-start rounded-md text-white">
            {notifications.map((notification, index) => (
                <>
                    <details className="w-full" key={notification.id}>
                        <summary className=" text-lm-black-100 flex items-center justify-center rounded-md border bg-white p-2">
                            {' '}
                            {notification.title}{' '}
                        </summary>
                        <button
                            key={index}
                            data-index={notification.id}
                            onClick={handleClick}
                        >
                            <p className="bg-lm-black-200 p-4">
                                {' '}
                                {notification.description}{' '}
                            </p>
                        </button>
                    </details>
                </>
            ))}
        </div>
    );
};

export { NotificationList };
