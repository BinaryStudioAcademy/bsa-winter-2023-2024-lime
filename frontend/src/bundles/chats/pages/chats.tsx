import {
    Chat,
    ChatSidebar,
    EmptyChat,
} from '~/bundles/chats/components/components.js';
import { actions as chatsActions } from '~/bundles/chats/store/chats.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useParams,
} from '~/bundles/common/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';

const Chats = (): JSX.Element => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { chats, aiAssistantChat, currentChat } = useAppSelector(
        ({ chats }) => chats,
    );
    const { user } = useAppSelector(({ auth }) => auth);

    const loadAllChats = useCallback(() => {
        void dispatch(chatsActions.getAllChats());
    }, [dispatch]);

    const loadCurrentChat = useCallback(() => {
        if (id && id !== String(currentChat?.id)) {
            return void dispatch(chatsActions.getChat({ chatId: String(id) }));
        }
        if (!id && currentChat) {
            const redirectPath = configureString(AppRoute.CHATS_$ID, {
                id: String(currentChat.id),
            });

            return void navigate(redirectPath);
        }
    }, [id, currentChat, dispatch, navigate]);

    useEffect(() => {
        loadAllChats();
    }, [loadAllChats]);

    useEffect(() => {
        loadCurrentChat();
    }, [loadCurrentChat]);

    useEffect(() => {
        if (id && !currentChat) {
            navigate(AppRoute.CHATS);
        }
    }, [currentChat, id, navigate]);

    return (
        <div className="flex h-full flex-[1] flex-col">
            <div className="border-buttonTertiary grid flex-[1] grid-cols-[auto] overflow-hidden rounded-xl border lg:grid-cols-[300px_auto]">
                <ChatSidebar
                    user={user as UserAuthResponseDto}
                    chats={chats}
                    aiAssistantChat={aiAssistantChat}
                    className={getValidClassNames(id && 'hidden lg:flex')}
                    currentChatId={String(currentChat?.id)}
                    onLoadCurrentChat={loadCurrentChat}
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
