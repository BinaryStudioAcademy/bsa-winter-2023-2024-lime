import {
    AiChatLink,
    ChatLink,
    ChatSearchBar,
} from '~/bundles/chats/components/components.js';
import { type SEARCH_DEFAULT_PAYLOAD } from '~/bundles/chats/constants/constants.js';
import { DEBOUNCE_TIME_MS } from '~/bundles/chats/constants/debouce-time.constant.js';
import { filterChats } from '~/bundles/chats/helpers/helpers.js';
import { type ChatPreviewResponseDto } from '~/bundles/chats/types/types.js';
import { Button, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

type Properties = {
    user: UserAuthResponseDto;
    chats: ChatPreviewResponseDto[];
    aiAssistantChat: ChatPreviewResponseDto | null;
    className?: string;
    currentChatId: string;
    onLoadCurrentChat: () => void;
};

const ChatSidebar = ({
    user,
    chats,
    aiAssistantChat,
    currentChatId,
    className,
    onLoadCurrentChat,
}: Properties): JSX.Element => {
    const [usersChats, setUsersChats] = useState<
        ChatPreviewResponseDto[] | null
    >(null);
    const [search, setSearch] = useState<string | null>(null);

    useEffect(() => {
        if (!search) {
            setUsersChats([...chats]);
        }
    }, [chats, search]);

    const handleSearchChats = useCallback(
        (payload: typeof SEARCH_DEFAULT_PAYLOAD): (() => void) => {
            const debounce = setTimeout(() => {
                setSearch(payload.search);
                setUsersChats([...filterChats(chats, payload.search)]);
            }, DEBOUNCE_TIME_MS);

            return () => clearTimeout(debounce);
        },
        [chats],
    );

    return (
        <div
            className={getValidClassNames(
                className,
                'border-r-buttonTertiary max-h-full flex-col overflow-hidden border-r px-3 lg:flex',
            )}
        >
            <div className="mb-4">
                <ChatSearchBar onSearchChats={handleSearchChats} />
                <Link to={AppRoute.FRIENDS}>
                    <Button label="Add new chat" size="sm" variant="primary" />
                </Link>
            </div>
            <div className="mb-4">
                <span className="text-secondary mb-1">AI</span>
                <AiChatLink
                    aiAssistantChat={aiAssistantChat}
                    isActive={currentChatId === String(aiAssistantChat?.id)}
                    onLoadCurrentChat={onLoadCurrentChat}
                />
            </div>
            <span className="text-secondary mb-1">Friends</span>
            <ul className="mb-4 flex h-full flex-1 list-none flex-col gap-5 overflow-y-auto">
                {usersChats &&
                    usersChats.map(({ id, users, lastMessage }) => (
                        <li key={id}>
                            <ChatLink
                                user={user}
                                id={id}
                                users={users}
                                lastMessage={lastMessage && lastMessage.text}
                                lastMessageTime={
                                    lastMessage && lastMessage.createdAt
                                }
                                isActive={currentChatId === String(id)}
                                onLoadCurrentChat={onLoadCurrentChat}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export { ChatSidebar };
