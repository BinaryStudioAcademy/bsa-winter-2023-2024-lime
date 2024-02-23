import { useCallback } from 'react';

type Properties = {
    notifications: string[];
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
        <div className="bg-lm-black-200 absolute right-0 flex w-52 flex-col items-center justify-start rounded-sm text-white">
            {notifications.map((notification, index) => (
                <button key={index} data-index={index} onClick={handleClick}>
                    {notification}
                </button>
            ))}
        </div>
    );
};

export { NotificationList };
