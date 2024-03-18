import { XMarkIcon } from '@heroicons/react/24/solid';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

type Properties = {
    notification: NotificationResponseDto;
    onRead: (id: number) => void;
    onDelete: (id: number) => void;
    setIsOpened: (
        value: number | ((previousValue: number | null) => number | null),
    ) => void;
    children: React.ReactNode;
};

const NotificationActions = ({
    notification,
    onRead,
    onDelete,
    setIsOpened,
    children,
}: Properties): JSX.Element => {
    const handleReadClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            if (!notification.isRead) {
                onRead(notification.id);
            }
            setIsOpened((previousValue) =>
                previousValue === notification.id ? null : notification.id,
            );
        },
        [onRead, notification, setIsOpened],
    );

    const handleDeleteClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onDelete(notification.id);
        },
        [onDelete, notification.id],
    );

    return (
        <div className="relative">
            <button
                onClick={handleReadClick}
                className={getValidClassNames(
                    'border-buttonTertiary bg-primary  w-full rounded border  p-4 transition-all',
                    notification.isRead ? 'bg-secondary' : '',
                )}
            >
                {children}
            </button>
            {notification.isRead && (
                <button
                    data-index={notification.id}
                    onClick={handleDeleteClick}
                    type="button"
                    className=" hover:bg-lm-black-200 hover:rounded-s-34 font-heavybold absolute right-1 top-1 h-4 w-4 text-xs transition-all"
                >
                    <XMarkIcon />
                </button>
            )}
        </div>
    );
};

export { NotificationActions };
