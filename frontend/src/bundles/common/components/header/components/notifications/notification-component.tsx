import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useHandleClickOutside,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { createSelector } from '~/bundles/common/redux/selectors/selectors.js';
import { type RootState } from '~/bundles/common/types/types.js';
import {
    dismissNotification,
    fetchNotifications,
} from '~/bundles/notifications/store/actions.js';

import { NotificationList } from './components/notification-list.js';
import { NotificationIcon } from './components/notifications-header.js';

const selectNotifications = (state: RootState): RootState['notifications'] =>
    state.notifications;

const NotificationComponent = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const selectorNotifications = createSelector(
        [selectNotifications],
        (notifications) => ({ notifications }),
    );

    const { notifications } = useAppSelector(selectorNotifications);

    useEffect(() => {
        void dispatch(fetchNotifications());
    }, [dispatch]);

    const [showList, setShowList] = useState(false);

    const handleIconClick = useCallback(() => {
        setShowList(!showList);
    }, [showList]);

    const handleNotificationClick = useCallback(
        (id: number) => {
            void dispatch(dismissNotification(id.toString()));

            setShowList(notifications.length > 1);
        },
        [dispatch, notifications],
    );

    const notificationListReference = useRef(null);

    useHandleClickOutside({
        ref: notificationListReference,
        onClick: () => setShowList(false),
    });

    return (
        <div className="relative" ref={notificationListReference}>
            <NotificationIcon
                count={notifications.length}
                onClick={handleIconClick}
                showList={showList}
            />
            {showList && (
                <NotificationList
                    notifications={notifications}
                    onNotificationClick={handleNotificationClick}
                />
            )}
        </div>
    );
};

export { NotificationComponent };
