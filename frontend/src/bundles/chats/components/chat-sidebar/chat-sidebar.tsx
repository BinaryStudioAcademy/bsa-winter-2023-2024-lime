import { Button } from '~/bundles/common/components/components.js';

import { type ChatLink as TChatLink } from '../../types/types.js';
import { AiChatLink } from '../ai-chat-link/ai-chat-link.js';
import { ChatLink } from '../chat-link/chat-link.js';
import { ChatSearchBar } from '../chat-search-bar/chat-search-bar.js';

type Properties = {
    chatLinks: TChatLink[];
    aiChat: {
        lastMessage: string;
    };
};

const ChatSidebar = ({ chatLinks, aiChat }: Properties): JSX.Element => {
    const hasChat = true;
    return (
        <div className="border-r-lm-grey-300 flex max-h-full flex-col overflow-hidden border-r px-3">
            <div className="mb-4">
                <ChatSearchBar />
                <Button label="Add new chat" size="sm" variant="primary" />
            </div>
            <div className="mb-4">
                <span className="text-secondary mb-1">AI</span>
                <AiChatLink lastMessage={aiChat.lastMessage} />
            </div>
            <span className="text-secondary mb-1">Friends</span>
            <ul className="mb-4 flex h-full flex-1 list-none flex-col gap-5 overflow-y-auto">
                {hasChat &&
                    chatLinks.map(({ status, username, lastMessage }, id) => (
                        <li key={id}>
                            <ChatLink
                                id={id}
                                status={status}
                                username={username}
                                lastMessage={lastMessage}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export { ChatSidebar };
