import { useCallback } from 'react';

import { Avatar } from '~/bundles/common/components/components.js';

import { messages } from '../../constants/constants.js';
import { ChatMessage } from '../chat-message/chat-message.js';
import { ChatMessageForm } from '../chat-message-form/chat-message-form.js';

type Properties = {
    currentChatLink: string;
};

const Chat = ({ currentChatLink }: Properties): JSX.Element => {
    const handleSubmit = useCallback((): void => {}, []);

    return (
        <>
            <div className="flex max-h-full flex-col justify-between overflow-hidden">
                <div className="flex h-20 w-full items-center p-4">
                    <div className="flex items-center gap-2">
                        <Avatar
                            size="sm"
                            email="email@gmail.com"
                            avatarUrl={null}
                        />
                        <span className="text-primary font-bold">UserName</span>
                        {/* Just to show link */}
                        <span className="text-primary">{currentChatLink}</span>
                    </div>
                </div>
                <ul className="flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto px-4 pr-2">
                    {messages.map(
                        ({ message, isCurrentUserMessage }, index) => (
                            <ChatMessage
                                key={index}
                                isCurrentUserMessage={isCurrentUserMessage}
                                sendDate={new Date()} // We'll use our date.
                                message={message}
                            />
                        ),
                    )}
                </ul>
                <div className="grid w-full items-center p-5">
                    <ChatMessageForm onSubmit={handleSubmit} />
                </div>
            </div>
        </>
    );
};

export { Chat };
