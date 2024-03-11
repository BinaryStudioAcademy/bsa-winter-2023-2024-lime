import { Button } from '~/bundles/common/components/components.js';

import { AiChatLink } from '../ai-chat-link/ai-chat-link.js';
import { ChatRoomLink } from '../chat-room-link/chat-room-link.js';
import { ChatSearchBar } from '../chat-search-bar/chat-search-bar.js';

type Properties = {
    chats: {
        status: string;
        lastMessage: string;
        username: string;
    }[];
    aiChat: {
        lastMessage: string;
    };
};

const ChatSidebar = ({ chats, aiChat }: Properties): JSX.Element => {
    const hasChat = true;
    return (
        <div className="flex max-h-full flex-col overflow-hidden px-3">
            <div className="mb-4">
                <ChatSearchBar />
                <Button label="Add new chat" size="sm" variant="primary" />
            </div>
            <div className="mb-4">
                <span className="text-secondary mb-1">AI</span>
                <AiChatLink lastMessage={aiChat.lastMessage} />
            </div>
            <span className="text-secondary">Friends</span>
            <ul className="mb-4 flex h-full flex-1 list-none flex-col gap-5 overflow-y-auto">
                {hasChat &&
                    chats.map((item, id) => (
                        <li key={id}>
                            <ChatRoomLink
                                id={id}
                                status={item.status}
                                username={item.username}
                                lastMessage={item.lastMessage}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export { ChatSidebar };
