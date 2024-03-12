import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { useParams } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { formatChatLinkDate } from '../../helpers/helpers.js';

const Status = { ONLINE: 'online', OFFLINE: 'offline' };

type Properties = {
    id: number;
    status: ValueOf<typeof Status>;
    lastMessage: string;
    username: string;
};

const ChatRoomLink = ({
    id,
    status,
    lastMessage,
    username,
}: Properties): JSX.Element => {
    const { id: parameterId } = useParams();
    const isActive = String(id) === parameterId;

    const chatRouteById = configureString(AppRoute.CHATS_$ID, {
        id: String(id),
    }) as typeof AppRoute.CHATS_$ID;

    return (
        <Link to={chatRouteById}>
            <div
                className={`flex items-center gap-5 ${isActive && 'bg-secondary border-l-lm-yellow-100 rounded-br-xl rounded-tr-xl border-l-4 p-2'}`}
            >
                <div className="relative">
                    <Avatar
                        size="sm"
                        email="email@gmail.com"
                        avatarUrl={null}
                    />
                    <div
                        className={getValidClassNames(
                            'absolute bottom-0 right-0 h-2 w-2 rounded-full',
                            status === Status.ONLINE
                                ? 'bg-lm-yellow-200'
                                : 'bg-lm-red',
                        )}
                    ></div>
                </div>
                <div className="flex w-full max-w-[9rem] flex-col gap-1 overflow-hidden text-ellipsis whitespace-nowrap py-2">
                    <p
                        className={`${isActive ? 'text-action' : 'text-primary'} text-sm font-semibold`}
                    >
                        {username}
                    </p>
                    <p className="text-secondary text-xs">{lastMessage}</p>
                </div>
                <p className="text-secondary mr-1 text-xs">
                    {formatChatLinkDate(new Date())}
                </p>
            </div>
        </Link>
    );
};

export { ChatRoomLink };
