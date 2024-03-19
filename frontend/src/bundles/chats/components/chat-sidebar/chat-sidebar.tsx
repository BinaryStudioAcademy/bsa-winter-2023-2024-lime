import {
    AiChatLink,
    ChatLink,
    ChatSearchBar,
} from '~/bundles/chats/components/components.js';
import { type ChatPreviewResponseDto } from '~/bundles/chats/types/types.js';
import { Button } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
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
    return (
        <div
            className={getValidClassNames(
                className,
                'border-r-buttonTertiary max-h-full flex-col overflow-hidden border-r px-3 lg:flex',
            )}
        >
            <div className="mb-4">
                <ChatSearchBar />
                <Button label="Add new chat" size="sm" variant="primary" />
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
                {chats &&
                    chats.map(({ id, users, lastMessage }) => (
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
