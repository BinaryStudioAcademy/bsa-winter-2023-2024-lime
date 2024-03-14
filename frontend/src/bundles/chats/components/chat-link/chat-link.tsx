import { Status } from '~/bundles/chats/enums/enums.js';
import { formatChatDate } from '~/bundles/chats/helpers/helpers.js';
import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    id: number;
    status: ValueOf<typeof Status>;
    lastMessage: string;
    username: string;
};

const ChatLink = ({
    id,
    status,
    lastMessage,
    username,
}: Properties): JSX.Element => {
    const isActive = false;

    const chatRouteById = configureString(AppRoute.CHATS_$ID, {
        id: String(id),
    }) as typeof AppRoute.CHATS_$ID;

    return (
        <Link to={chatRouteById}>
            <div
                className={getValidClassNames(
                    isActive &&
                        'bg-primary border-l-lm-yellow-100 rounded-br-xl rounded-tr-xl border-l-4 p-2',
                    'flex items-center gap-5',
                )}
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
                <div className="flex w-full flex-col gap-1 overflow-hidden py-2 lg:max-w-[9rem]">
                    <p
                        className={getValidClassNames(
                            isActive ? 'text-action' : 'text-primary',
                            'text-sm font-semibold',
                        )}
                    >
                        {username}
                    </p>
                    <p className="text-secondary truncate whitespace-nowrap text-xs">
                        {lastMessage}
                    </p>
                </div>
                <p className="text-secondary mr-1 text-xs">
                    {/*  We'll use our date. */}
                    {formatChatDate(new Date())}
                </p>
            </div>
        </Link>
    );
};

export { ChatLink };
