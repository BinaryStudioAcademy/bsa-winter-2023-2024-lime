import { useParams } from '~/bundles/common/hooks/hooks.js';

import { Chat, ChatSidebar, EmptyChat } from '../components/components.js';
import { chatsLinksData } from '../constants/constants.js';

const Chats = (): JSX.Element => {
    const { id } = useParams();

    return (
        <div className="flex h-full flex-[1] flex-col overflow-hidden">
            <div className="border-buttonTertiary grid flex-[1] grid-cols-[300px_auto] overflow-hidden rounded-xl border">
                <ChatSidebar
                    chatLinks={chatsLinksData}
                    aiChat={{ lastMessage: 'Hello world' }}
                />
                {id ? <Chat currentChatLink={id ?? ''} /> : <EmptyChat />}
            </div>
        </div>
    );
};

export { Chats };
