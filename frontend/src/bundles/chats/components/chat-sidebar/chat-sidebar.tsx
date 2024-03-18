import { AiChatLink } from '~/bundles/chats/components/ai-chat-link/ai-chat-link.js';
import { ChatLink } from '~/bundles/chats/components/chat-link/chat-link.js';
import { ChatSearchBar } from '~/bundles/chats/components/chat-search-bar/chat-search-bar.js';
import { type ChatPreviewResponseDto } from '~/bundles/chats/types/types.js';
import { Button } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { Status } from '../../enums/status.enum.js';

type Properties = {
    chats: ChatPreviewResponseDto[];
    className?: string;
};

const ChatSidebar = ({ chats, className }: Properties): JSX.Element => {
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
                <AiChatLink />
            </div>
            <span className="text-secondary mb-1">Friends</span>
            <ul className="mb-4 flex h-full flex-1 list-none flex-col gap-5 overflow-y-auto">
                {chats.length > 1 &&
                    chats.map(({ lastMessage }, id) => (
                        <li key={id}>
                            <ChatLink
                                id={id}
                                status={Status.ONLINE}
                                username={'User 1'}
                                lastMessage={lastMessage?.text ?? ''}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export { ChatSidebar };
