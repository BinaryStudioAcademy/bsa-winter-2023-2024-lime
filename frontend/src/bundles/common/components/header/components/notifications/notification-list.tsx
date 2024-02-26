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
                    <details className="w-full border rounded" key={notification.id}>
                        <summary className=" bg-lm-black-100 hover:bg-lm-black-300 cursor-pointer flex items-center justify-center rounded-md p-2 text-white">
                            
                            {notification.title}
                        </summary>
                        <button
                            key={index}
                            data-index={notification.id}
                            onClick={handleClick}
                            type='button'
                        >
                            <p className="bg-lm-black-100 hover:bg-lm-black-200 p-4 rounded">
                                {notification.description}
                            </p>
                        </button>
                    </details>
                </>
            ))}
        </div>
    );
};

export { NotificationList };
