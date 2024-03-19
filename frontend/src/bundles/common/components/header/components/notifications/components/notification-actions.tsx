import { XMarkIcon } from '@heroicons/react/24/solid';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    deleteNotification,
    dismissNotification,
} from '~/bundles/notifications/store/actions.js';
import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

type Properties = {
    notification: NotificationResponseDto;
    setIsOpened: (
        value: number | ((previousValue: number | null) => number | null),
    ) => void;
    children: React.ReactNode;
};

const NotificationActions = ({
    notification,
    setIsOpened,
    children,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleReadClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            if (!notification.isRead) {
                void dispatch(dismissNotification(notification.id));
            }
            setIsOpened((previousValue) =>
                previousValue === notification.id ? null : notification.id,
            );
        },
        [notification, setIsOpened, dispatch],
    );

    const handleDeleteClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            void dispatch(deleteNotification(notification.id));
        },
        [notification.id, dispatch],
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
