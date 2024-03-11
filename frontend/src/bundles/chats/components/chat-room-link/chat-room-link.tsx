import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { formatChatLinkDate } from '../../helpers/helpers.js';

const Status = { ONLINE: 'online', OFFLINE: 'offline' };

const ChatRoomLink = (): JSX.Element => {
    const status: ValueOf<typeof Status> = 'online';
    const message =
        'Hello world!Hello worldHello worldHello worldHello worldHello world';
    const username = 'Ivan Bilobrov';
    return (
        <Link className="text-lm-yellow-100" to={AppRoute.CHATS_ROOM}>
            <div className="flex items-center gap-5">
                <div className="relative">
                    <Avatar size="sm" email="a@a.com" avatarUrl={null} />
                    <div
                        className={getValidClassNames(
                            'absolute bottom-0 right-0 h-3 w-3 rounded-full',
                            status === Status.ONLINE
                                ? 'bg-lm-yellow-200'
                                : 'bg-lm-red',
                        )}
                    ></div>
                </div>
                <div className="flex w-full max-w-[9rem] flex-col gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    <p className="text-lm-yellow-100 text-sm">{username}</p>
                    <p className="text-lm-grey-200 text-xs">{message}</p>
                </div>
                <p className="text-lm-grey-200 mr-1 text-xs">
                    {formatChatLinkDate(new Date())}
                </p>
            </div>
        </Link>
    );
};

export { ChatRoomLink };
