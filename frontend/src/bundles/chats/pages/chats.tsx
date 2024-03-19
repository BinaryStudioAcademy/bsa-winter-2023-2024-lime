import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useParams,
} from '~/bundles/common/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

import { Chat, ChatSidebar, EmptyChat } from '../components/components.js';
import { actions as chatsActions } from '../store/chats.js';

const Chats = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const { chats, aiAssistantChat, currentChat } = useAppSelector(
        ({ chats }) => chats,
    );
    const { user } = useAppSelector(({ auth }) => auth);

    const loadAllChats = useCallback(() => {
        void dispatch(chatsActions.getAllChats());
    }, [dispatch]);

    useEffect(() => {
        loadAllChats();
    }, [loadAllChats]);

    return (
        <div className="flex h-full flex-[1] flex-col">
            <div className="border-buttonTertiary grid flex-[1] grid-cols-[auto] overflow-hidden rounded-xl border lg:grid-cols-[300px_auto]">
                <ChatSidebar
                    user={user as UserAuthResponseDto}
                    chats={chats}
                    aiAssistantChat={aiAssistantChat}
                    className={getValidClassNames(id && 'hidden lg:flex')}
                    currentChatId={String(currentChat?.id)}
                />
                <div
                    className={getValidClassNames(
                        !id && 'hidden lg:flex lg:justify-center',
                        'overflow-hidden',
                    )}
                >
                    {id ? (
                        <Chat
                            user={user as UserAuthResponseDto}
                            currentChat={currentChat}
                        />
                    ) : (
                        <EmptyChat />
                    )}
                </div>
            </div>
        </div>
    );
};

export { Chats };
