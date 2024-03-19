import { AiChatLink } from '~/bundles/chats/components/ai-chat-link/ai-chat-link.js';
import { ChatLink } from '~/bundles/chats/components/chat-link/chat-link.js';
import { ChatSearchBar } from '~/bundles/chats/components/chat-search-bar/chat-search-bar.js';
import { type ChatPreviewResponseDto } from '~/bundles/chats/types/types.js';
import { Button } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

import { Status } from '../../enums/status.enum.js';
import { getChatCompanions } from '../../helpers/get-chat-companions.helper.js';
import { formatChatName } from '../../helpers/helpers.js';

type Properties = {
    user: UserAuthResponseDto;
    chats: ChatPreviewResponseDto[];
    aiAssistantChat: ChatPreviewResponseDto | null;
    className?: string;
    currentChatId: string;
};

const ChatSidebar = ({
    user,
    chats,
    aiAssistantChat,
    currentChatId,
    className,
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
                    currentChatId={currentChatId}
                    isActive={currentChatId === String(aiAssistantChat?.id)}
                />
            </div>
            <span className="text-secondary mb-1">Friends</span>
            <ul className="mb-4 flex h-full flex-1 list-none flex-col gap-5 overflow-y-auto">
                {chats &&
                    chats.map(({ id, users, lastMessage }) => (
                        <li key={id}>
                            <ChatLink
                                id={id}
                                status={Status.ONLINE}
                                companions={formatChatName(
                                    getChatCompanions(users, user.id),
                                )}
                                lastMessage={lastMessage && lastMessage.text}
                                lastMessageTime={
                                    lastMessage && lastMessage.createdAt
                                }
                                currentChatId={currentChatId}
                                isActive={currentChatId === String(id)}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export { ChatSidebar };
