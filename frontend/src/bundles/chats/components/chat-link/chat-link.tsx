import { formatChatDate } from '~/bundles/chats/helpers/helpers.js';
import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';

type Properties = {
    id: number;
    lastMessage: string | null;
    lastMessageTime: string | null;
    companions: string;
    isActive: boolean;
    onLoadCurrentChat: () => void;
};

const ChatLink = ({
    id,
    lastMessage,
    lastMessageTime,
    companions,
    isActive,
    onLoadCurrentChat,
}: Properties): JSX.Element => {
    const chatRouteById = configureString(AppRoute.CHATS_$ID, {
        id: String(id),
    }) as typeof AppRoute.CHATS_$ID;

    return (
        <Link to={chatRouteById}>
            <button onClick={onLoadCurrentChat} className="w-full">
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
                    </div>
                    <div className="flex w-full items-center justify-between ">
                        <div className="flex w-full flex-col items-start gap-1 overflow-hidden py-2 lg:max-w-[9rem] ">
                            <p
                                className={getValidClassNames(
                                    isActive ? 'text-action' : 'text-primary',
                                    'truncate whitespace-nowrap text-sm font-semibold',
                                )}
                            >
                                {companions}
                            </p>
                            <p className="text-secondary truncate whitespace-nowrap text-xs">
                                {lastMessage}
                            </p>
                        </div>
                        <p className="text-secondary mr-1 text-xs">
                            {formatChatDate(lastMessageTime, false)}
                        </p>
                    </div>
                </div>
            </button>
        </Link>
    );
};

export { ChatLink };
