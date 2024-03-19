import { Status } from '~/bundles/chats/enums/enums.js';
import { formatChatDate } from '~/bundles/chats/helpers/helpers.js';
import { actions as chatsActions } from '~/bundles/chats/store/chats.js';
import { Avatar, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    id: number;
    status: ValueOf<typeof Status>;
    lastMessage: string;
    companions: string;
    lastMessageTime: string | null;
    currentChatId: string;
    isActive: boolean;
};

const ChatLink = ({
    id,
    status,
    lastMessage,
    companions,
    lastMessageTime,
    currentChatId,
    isActive,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();

    const chatRouteById = configureString(AppRoute.CHATS_$ID, {
        id: String(id),
    }) as typeof AppRoute.CHATS_$ID;

    const loadCurrentChat = useCallback(() => {
        if (String(id) !== currentChatId) {
            void dispatch(chatsActions.getChat({ chatId: String(id) }));
        }
    }, [id, currentChatId, dispatch]);

    return (
        <Link to={chatRouteById}>
            <button onClick={loadCurrentChat} className="w-full">
                <div
                    className={getValidClassNames(
                        isActive &&
                            'bg-primary border-l-lm-yellow-100 rounded-br-xl rounded-tr-xl border-l-4 p-2',
                        'flex items-center gap-5',
                    )}
                >
                    <div className="relative">
                        <Avatar
                            size="sm"
                            email="email@gmail.com"
                            avatarUrl={null}
                        />
                        <div
                            className={getValidClassNames(
                                'absolute bottom-0 right-0 h-2 w-2 rounded-full',
                                status === Status.ONLINE
                                    ? 'bg-lm-yellow-200'
                                    : 'bg-lm-red',
                            )}
                        ></div>
                    </div>
                    <div className="flex w-full items-center justify-between ">
                        <div className="flex w-full flex-col items-start gap-1 overflow-hidden py-2 lg:max-w-[9rem] ">
                            <p
                                className={getValidClassNames(
                                    isActive ? 'text-action' : 'text-primary',
                                    'truncate whitespace-nowrap text-sm font-semibold',
                                )}
                            >
                                {companions}
                            </p>
                            <p className="text-secondary truncate whitespace-nowrap text-xs">
                                {lastMessage}
                            </p>
                        </div>
                        <p className="text-secondary mr-1 text-xs">
                            {formatChatDate(lastMessageTime)}
                        </p>
                    </div>
                </div>
            </button>
        </Link>
    );
};

export { ChatLink };
