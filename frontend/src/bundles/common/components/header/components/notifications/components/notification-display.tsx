import { DateFormat } from '~/bundles/common/enums/enums.js';
import { formatDateString } from '~/bundles/common/helpers/helpers.js';
import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

type Properties = {
    notification: NotificationResponseDto;
    isOpened: boolean;
};

const NotificationDisplay = ({
    notification,
    isOpened,
}: Properties): JSX.Element => {
    const { title, message, createdAt } = notification;
    return (
        <details className="pointer-events-none w-full" open={isOpened}>
            <summary
                className={
                    'flex cursor-pointer items-center justify-center gap-2 text-center text-sm transition-all'
                }
            >
                <span className="flex flex-col gap-0.5">
                    <span>{title}</span>
                    <span className="text-lm-grey-300 text-xs font-normal leading-3">
                        {formatDateString(
                            new Date(createdAt as string),
                            DateFormat.FULL_DAY_SHORT_MONTH_TIME,
                        )}
                    </span>
                </span>
            </summary>
            <div className="flex flex-col gap-2">
                <p className="p-1 text-justify text-sm">{message}</p>
            </div>
        </details>
    );
};

export { NotificationDisplay };
