import {
    ArrowLeftCircleIcon,
    TrashIcon,
    XCircleIcon,
} from '@heroicons/react/16/solid';

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
    Button,
    Icon,
    Link,
    Loader,
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

    const handleDeleteChatHistory = useCallback((): void => {
        if (
            currentChat &&
            currentChat.isAssistant &&
            currentChat.messages.length > 0
        ) {
            void dispatch(
                chatActionCreator.deleteChatHistory({ chatId: currentChat.id }),
            );
        }
    }, [currentChat, dispatch]);

    const handleCloseChat = useCallback((): void => {
        void dispatch(chatActionCreator.clearCurrentChat());
    }, [dispatch]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebarProfile = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    if (!currentChat) {
        return (
            <div className="relative h-full">
                <Loader isOverflow />
            </div>
        );
    }

    const { users, isAssistant, messages } = currentChat;

    const chatMember = users.find((member) => member.id !== user.id);

    return (
        <div className="relative flex h-full overflow-hidden">
            <div className="flex max-h-full w-full flex-col justify-between overflow-hidden">
                <div className="flex h-20 w-full items-center justify-between p-4">
                    <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={toggleSidebarProfile}
                        role="presentation"
                    >
                        <Link
                            to={AppRoute.CHATS}
                            className="mr-2 flex lg:hidden"
                        >
                            <button onClick={handleCloseChat}>
                                <ArrowLeftCircleIcon className="text-lm-yellow-100 w-6 duration-[0.5s] ease-[ease-in-out] hover:opacity-80" />
                            </button>
                        </Link>
                        {currentChat && (
                            <>
                                {isAssistant ? (
                                    <Icon
                                        name="aiAssistantIcon"
                                        className="mr-2 h-12 w-12"
                                    />
                                ) : (
                                    <Avatar
                                        size="sm"
                                        email={
                                            chatMember?.fullName ??
                                            chatMember?.email ??
                                            ''
                                        }
                                        avatarUrl={
                                            chatMember?.avatarUrl ?? null
                                        }
                                    />
                                )}
                                <span className="text-primary font-bold">
                                    {!isAssistant &&
                                        users &&
                                        formatChatName(
                                            getChatCompanions(users, user.id),
                                        )}
                                    {isAssistant && 'Personal Assistant'}
                                </span>
                            </>
                        )}
                    </div>
                    {isAssistant && (
                        <div className="w-[4rem]">
                            <Button
                                onClick={handleDeleteChatHistory}
                                size={'sm'}
                                variant={'primary'}
                                label={''}
                                leftIcon={<TrashIcon className="w-5" />}
                            />
                        </div>
                    )}
                </div>
                <ul className="flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto px-4 pr-2">
                    {messages.map(({ id, text, senderId, createdAt }) => (
                        <ChatMessage
                            key={id}
                            isCurrentUserMessage={senderId === user.id}
                            sendDate={createdAt}
                            message={text}
                        />
                    ))}
                </ul>
                <div className="grid w-full items-center p-5">
                    <ChatMessageForm onSubmit={handleSubmit} />
                </div>
            </div>
            {!isAssistant && (
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
                            userId={chatMember?.id ?? null}
                            name={
                                chatMember?.fullName ?? chatMember?.email ?? ''
                            }
                            image={chatMember?.avatarUrl ?? ''}
                            className="w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export { Chat };
