import { Popover } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

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
    const [isOpenedId, setIsOpenedId] = useState<null | number>(null);
    const handleReadClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const id = Number(event.currentTarget.dataset['index']);
            onNotificationReadClick(id);
            setIsOpenedId(isOpenedId === id ? null : id);
        },
        [onNotificationReadClick, isOpenedId],
    );
    const handleDeleteClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            const index = Number(event.currentTarget.dataset['index']);
            onNotificationDeleteClick(index);
        },
        [onNotificationDeleteClick],
    );
    return (
        <div className="bg-secondary rounded-34 text-primary absolute right-0 flex w-52 flex-col px-2 shadow-lg" >
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <Popover
                        className="border-buttonTertiary bg-primary relative w-full rounded border text-sm"
                        content={<></>}
                        key={notification.id}
                    >
                        <details
                            className="w-full"
                            open={isOpenedId === notification.id}
                        >
                            <summary
                                className={` flex cursor-pointer items-center justify-center p-2 ${notification.isRead ? 'bg-secondary' : ''} transition-all `}
                            >
                                <button
                                    onClick={handleReadClick}
                                    data-index={notification.id}
                                >
                                    {notification.title}
                                </button>
                            </summary>
                            <p className="p-4">{notification.message}</p>
                        </details>
                        <button
                            key={index}
                            data-index={notification.id}
                            onClick={handleDeleteClick}
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
