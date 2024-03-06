import { XMarkIcon } from '@heroicons/react/24/solid';

import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

type NotificationItemProperties = {
    notification: NotificationResponseDto;
    onRead: (id: number) => void;
    onDelete: (id: number) => void;
};

const NotificationItem = ({
    notification,
    onRead,
    onDelete,
}: NotificationItemProperties): JSX.Element => {
    const handleReadClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onRead(notification.id);
        },
        [onRead, notification.id],
    );

    const handleDeleteClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onDelete(notification.id);
        },
        [onDelete, notification.id],
    );

    return (
        <button
            onClick={handleReadClick}
            className={`border-buttonTertiary bg-primary relative w-full rounded border  p-4 transition-all ${notification.isRead ? 'bg-secondary' : ''} `}
        >
            <details className="w-full" open={notification.isRead}>
                <summary
                    className={
                        'flex cursor-pointer items-center justify-center text-center text-sm transition-all '
                    }
                >
                    {notification.title}
                </summary>
                <p className="p-1 text-justify text-sm">
                    {notification.message}
                </p>
            </details>
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
        </button>
    );
};

export { NotificationItem };
