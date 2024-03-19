import { ArrowLeftCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';

import {
    ChatMessage,
    ChatMessageForm,
} from '~/bundles/chats/components/components.js';
import { type MESSAGE_DEFAULT_PAYLOAD } from '~/bundles/chats/constants/constants.js';
import {
    formatChatName,
    getChatCompanions,
} from '~/bundles/chats/helpers/helpers.js';
import { actions as chatActionCreator } from '~/bundles/chats/store/chats.js';
import { type ChatFullResponseDto } from '~/bundles/chats/types/types.js';
import {
    Avatar,
    Link,
    UserInfoCard,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

type Properties = {
    user: UserAuthResponseDto;
    currentChat: ChatFullResponseDto | null;
};

const Chat = ({ user, currentChat }: Properties): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        (payload: typeof MESSAGE_DEFAULT_PAYLOAD): void => {
            if (!currentChat || payload.message.trim().length === 0) {
                return;
            }

            const { users, id, isAssistant } = currentChat;
            const membersId = users.map((users) => users.id);

            const message = {
                chatId: id,
                text: payload.message,
                membersId,
            };

            void dispatch(chatActionCreator.sendMessage(message));

            if (isAssistant) {
                void dispatch(
                    chatActionCreator.generateAiAssistantResponse(message),
                );
            }
        },
        [currentChat, dispatch],
    );

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebarProfile = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [setIsOpen, isOpen]);

    return (
        <div className="relative flex h-full overflow-hidden">
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
                        {currentChat && (
                            <>
                                <Avatar
                                    size="sm"
                                    email={
                                        currentChat.users[0]?.email ??
                                        'email@gmail.com'
                                    }
                                    avatarUrl={
                                        currentChat.users[0]?.avatarUrl ?? null
                                    }
                                />
                                <span className="text-primary font-bold">
                                    {!currentChat.isAssistant &&
                                        currentChat.users &&
                                        formatChatName(
                                            getChatCompanions(
                                                currentChat.users,
                                                user.id,
                                            ),
                                        )}
                                    {currentChat.isAssistant &&
                                        'Personal Assistant'}
                                </span>
                            </>
                        )}
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
