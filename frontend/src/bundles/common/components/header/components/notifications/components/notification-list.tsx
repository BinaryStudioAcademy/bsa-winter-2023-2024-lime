import { useState } from '~/bundles/common/hooks/hooks.js';
import { type NotificationResponseDto } from '~/bundles/notifications/types/types.js';

import { NotificationActions, NotificationDisplay } from './components.js';

type Properties = {
    notifications: NotificationResponseDto[];
};

const NotificationList = ({ notifications }: Properties): JSX.Element => {
    const [isOpened, setIsOpened] = useState<number | null>(null);
    return (
        <div className="bg-secondary text-primary absolute right-0 flex w-52 flex-col shadow-lg">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div key={notification.id}>
                        <NotificationActions
                            notification={notification}
                            setIsOpened={setIsOpened}
                        >
                            <NotificationDisplay
                                notification={notification}
                                isOpened={isOpened === notification.id}
                            />
                        </NotificationActions>
                    </div>
                ))
            ) : (
                <p className="bg-primary text-primary border-buttonTertiary rounded border p-2 text-center text-sm">
                    There are no notifications
                </p>
            )}
        </div>
    );
};

export { NotificationList };
