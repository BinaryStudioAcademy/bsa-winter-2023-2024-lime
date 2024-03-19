import {
    formatChatDate,
    formatChatName,
    getChatCompanions,
} from '~/bundles/chats/helpers/helpers.js';
import { type ChatUserResponseDto } from '~/bundles/chats/types/types.js';
import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

type Properties = {
    id: number;
    user: UserAuthResponseDto;
    lastMessage: string | null;
    lastMessageTime: string | null;
    users: ChatUserResponseDto[];
    isActive: boolean;
    onLoadCurrentChat: () => void;
};

const ChatLink = ({
    id,
    user,
    lastMessage,
    lastMessageTime,
    users,
    isActive,
    onLoadCurrentChat,
}: Properties): JSX.Element => {
    const chatRouteById = configureString(AppRoute.CHATS_$ID, {
        id: String(id),
    }) as typeof AppRoute.CHATS_$ID;

    const { email, avatarUrl } = users.find(
        (member) => member.id !== user.id,
    ) as ChatUserResponseDto;

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
                        <Avatar size="sm" email={email} avatarUrl={avatarUrl} />
                    </div>
                    <div className="flex w-full items-center justify-between ">
                        <div className="flex w-full flex-col items-start gap-1 overflow-hidden py-2 lg:max-w-[9rem] ">
                            <p
                                className={getValidClassNames(
                                    isActive ? 'text-action' : 'text-primary',
                                    'truncate whitespace-nowrap text-sm font-semibold',
                                )}
                            >
                                {formatChatName(
                                    getChatCompanions(users, user.id),
                                )}
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
