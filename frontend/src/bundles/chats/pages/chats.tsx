import { RouterOutlet } from '~/bundles/common/components/components.js';

import { ChatSidebar } from '../components/components.js';
import { chatsData } from '../constants/constants.js';

const aiChat = {
    lastMessage: 'Hello world',
};

const Chats = (): JSX.Element => {
    return (
        <div className="flex h-full flex-[1] flex-col overflow-hidden">
            <h2 className="text-primary mb-5 font-bold">Chats</h2>
            <div className="border-buttonTertiary grid flex-[1] grid-cols-[300px_auto] overflow-hidden rounded-xl border">
                <ChatSidebar chats={chatsData} aiChat={aiChat} />
                <RouterOutlet />
            </div>
        </div>
    );
};

export { Chats };
