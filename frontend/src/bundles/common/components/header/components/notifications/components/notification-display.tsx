import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

type Properties = {
    notification: NotificationResponseDto;
    isOpened: boolean;
};

const NotificationDisplay = ({
    notification,
    isOpened,
}: Properties): JSX.Element => {
    const { title, message } = notification;
    return (
        <details className="pointer-events-none w-full" open={isOpened}>
            <summary
                className={
                    'flex cursor-pointer items-center justify-center text-center text-sm transition-all '
                }
            >
                {title}
            </summary>
            <p className="p-1 text-justify text-sm">{message}</p>
        </details>
    );
};

export { NotificationDisplay };
