import { Chat } from '../components/chat/chat.js';
import { ChatSidebar } from '../components/components.js';

const Chats = (): JSX.Element => {
    const currentChat = 1;
    return (
        <div className="flex h-full flex-[1] flex-col overflow-hidden">
            <h2 className="mb-5 font-bold text-white">Chats</h2>
            <div className="border-lm-black-100 grid flex-[1] grid-cols-[300px_auto] overflow-hidden rounded-xl border">
                <ChatSidebar />
                {currentChat ? (
                    <div className="bg-lm-black-100">
                        <Chat />
                    </div>
                ) : (
                    <div>No chat</div>
                )}
            </div>
        </div>
    );
};

export { Chats };
