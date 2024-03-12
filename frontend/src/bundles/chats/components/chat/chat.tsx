import { ArrowLeftCircleIcon } from '@heroicons/react/16/solid';
import { AppRoute } from 'shared';

import {
    Avatar,
    Button,
    Link,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { messages } from '../../constants/constants.js';
import { ChatMessage } from '../chat-message/chat-message.js';
import { ChatMessageForm } from '../chat-message-form/chat-message-form.js';

type Properties = {
    currentChatLink: string;
};

const Chat = ({ currentChatLink }: Properties): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = useCallback((): void => {}, []);

    const toggleSidebarProfile = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [setIsOpen, isOpen]);

    return (
        <div className="relative flex h-full overflow-hidden">
            <div className="flex max-h-full flex-col justify-between overflow-hidden">
                <div className="flex h-20 w-full items-center p-4">
                    <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={toggleSidebarProfile}
                        role="presentation"
                    >
                        <Link
                            to={AppRoute.CHATS}
                            className="mr-2 flex lg:hidden"
                        >
                            <ArrowLeftCircleIcon className="text-lm-yellow-100 w-6" />
                        </Link>
                        <Avatar
                            size="sm"
                            email="email@gmail.com"
                            avatarUrl={null}
                        />
                        <span className="text-primary font-bold">Username</span>
                        <div className="text-primary font-bold">
                            {currentChatLink}
                        </div>
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
            <div
                className={getValidClassNames(
                    isOpen ? ' translate-x-0' : 'translate-x-[100%]',
                    'bg-lm-grey-200 absolute right-0 h-full w-full transition-transform duration-[0.5s] ease-[ease-in-out] md:w-[80%]',
                )}
            >
                <Button
                    label="X"
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={toggleSidebarProfile}
                    className="ml-2 mt-2 h-[2rem] w-[2rem]"
                />
            </div>
        </div>
    );
};

export { Chat };
