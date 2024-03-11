import { useCallback } from 'react';

import { Avatar } from '~/bundles/common/components/components.js';

import { ChatMessageForm } from '../chat-message-form/chat-message-form.js';

const Chat = (): JSX.Element => {
    const handleSubmit = useCallback((): void => {}, []);

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex h-20 w-full items-center gap-4 p-4 font-bold text-white">
                <div className="flex items-center gap-2">
                    <Avatar size={'sm'} email={'a@a.com'} avatarUrl={null} />
                    <span className="">Artem Lymarenko</span>
                </div>
            </div>
            <ul className=""></ul>
            <div className="">
                <ChatMessageForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export { Chat };
