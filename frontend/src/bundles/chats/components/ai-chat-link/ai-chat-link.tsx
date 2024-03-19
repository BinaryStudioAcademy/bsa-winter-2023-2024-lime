import { actions as chatsActions } from '~/bundles/chats/store/chats.js';
import { Icon, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';

import { formatChatDate } from '../../helpers/helpers.js';
import { type ChatPreviewResponseDto } from '../../types/types.js';

type Properties = {
    aiAssistantChat: ChatPreviewResponseDto | null;
    currentChatId: string;
    isActive: boolean;
};

const AiChatLink = ({
    aiAssistantChat,
    currentChatId,
    isActive,
}: Properties): JSX.Element => {
    const aiAssistantChatId = aiAssistantChat ? String(aiAssistantChat.id) : '';

    const dispatch = useAppDispatch();
    const chatRouteById = configureString(AppRoute.CHATS_AI_ASSISTANT_$ID, {
        id: aiAssistantChatId,
    }) as typeof AppRoute.CHATS_AI_ASSISTANT_$ID;

    const loadCurrentChat = useCallback(() => {
        if (String(aiAssistantChat?.id) !== currentChatId) {
            void dispatch(chatsActions.getChat({ chatId: aiAssistantChatId }));
        }
    }, [aiAssistantChatId, currentChatId, aiAssistantChat?.id, dispatch]);

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
                    <Icon name="aiAssistantIcon" className="h-12 w-12" />
                    <div className="flex w-full items-center justify-between ">
                        <div className="flex w-full flex-col items-start gap-1 overflow-hidden text-ellipsis whitespace-nowrap py-2 lg:max-w-[9rem]">
                            <p
                                className={getValidClassNames(
                                    isActive ? 'text-action' : 'text-primary',
                                    'text-sm',
                                )}
                            >
                                Personal Assistant
                            </p>
                            <p className="text-secondary text-xs">
                                {aiAssistantChat &&
                                    aiAssistantChat.lastMessage?.text}
                            </p>
                        </div>
                        <p className="text-secondary text-xs">
                            {formatChatDate(
                                aiAssistantChat &&
                                    aiAssistantChat.lastMessage?.createdAt,
                            )}
                        </p>
                    </div>
                </div>
            </button>
        </Link>
    );
};

export { AiChatLink };
