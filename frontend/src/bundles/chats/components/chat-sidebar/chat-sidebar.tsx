import { Button } from '~/bundles/common/components/components.js';

import { ChatRoomLink } from '../chat-room-link/chat-room-link.js';
import { ChatSearchBar } from '../chat-search-bar/chat-search-bar.js';

const chats = [
    'asd1',
    'asd2',
    'asd3',
    'asd4',
    'asd5',
    'asd6',
    'asd7',
    'asd8',
    'asd9',
    'asd10',
    'asd1',
    'asd2',
    'asd3',
    'asd4',
    'asd5',
    'asd6',
    'asd7',
    'asd8',
    'asd9',
    'asd10',
];

const ChatSidebar = (): JSX.Element => {
    const hasChat = true;
    return (
        <div className="bg-lm-black-200 flex max-h-full flex-col overflow-hidden px-2">
            <ChatSearchBar />
            <Button label="Add new chat" size="sm" variant="primary" />
            <ul className="my-4 flex h-full flex-1 list-none flex-col gap-4 overflow-y-auto">
                {hasChat &&
                    chats.map((item, id) => (
                        <li key={id}>
                            <ChatRoomLink />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export { ChatSidebar };
