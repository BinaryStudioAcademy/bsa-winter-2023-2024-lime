import { ArrowLeftCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { type ChatFullResponseDto, type UserAuthResponseDto } from 'shared';

import { ChatMessage } from '~/bundles/chats/components/chat-message/chat-message.js';
import { ChatMessageForm } from '~/bundles/chats/components/chat-message-form/chat-message-form.js';
import {
    Avatar,
    Link,
    Loader,
    UserInfoCard,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    user: UserAuthResponseDto;
    currentChat: ChatFullResponseDto | null;
    isLoading: boolean;
};

const Chat = ({ user, currentChat, isLoading }: Properties): JSX.Element => {
    const handleSubmit = useCallback((): void => {}, []);

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebarProfile = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [setIsOpen, isOpen]);

    if (isLoading) {
        return (
            <div className="relative h-full">
                <Loader isOverflow />
            </div>
        );
    }

    return (
        <div className="relative flex h-full  overflow-hidden">
            <div className="flex max-h-full w-full flex-col justify-between overflow-hidden">
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
                            <ArrowLeftCircleIcon className="text-lm-yellow-100 w-6 duration-[0.5s] ease-[ease-in-out] hover:opacity-80" />
                        </Link>
                        <Avatar
                            size="sm"
                            email="email@gmail.com"
                            avatarUrl={null}
                        />
                        <span className="text-primary font-bold">Username</span>
                    </div>
                </div>
                <ul className="flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto px-4 pr-2">
                    {currentChat?.messages.map(
                        ({ id, text, senderId, createdAt }) => (
                            <ChatMessage
                                key={id}
                                isCurrentUserMessage={senderId === user.id}
                                sendDate={createdAt}
                                message={text}
                            />
                        ),
                    )}
                </ul>
                <div className="grid w-full items-center p-5">
                    <ChatMessageForm onSubmit={handleSubmit} />
                </div>
            </div>
            {currentChat && !currentChat.isAssistant && (
                <div
                    className={getValidClassNames(
                        isOpen ? 'translate-x-0' : 'translate-x-[100%]',
                        'absolute right-0 h-full w-full transition-transform duration-[0.5s] ease-[ease-in-out] md:w-[22.375rem]',
                    )}
                >
                    <div className="relative flex h-full w-full flex-col">
                        <button
                            className="absolute ml-5 mt-5"
                            onClick={toggleSidebarProfile}
                        >
                            <XCircleIcon className="text-action w-6 duration-[0.5s] ease-[ease-in-out] hover:opacity-80" />
                        </button>
                        <UserInfoCard
                            name={'User'}
                            image={''}
                            className="w-full px-8"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export { Chat };
