import { formatChatDate } from '~/bundles/chats/helpers/helpers.js';
import { type ChatPreviewResponseDto } from '~/bundles/chats/types/types.js';
import { Icon, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureString,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';

type Properties = {
    aiAssistantChat: ChatPreviewResponseDto | null;
    isActive: boolean;
    onLoadCurrentChat: () => void;
};

const AiChatLink = ({
    aiAssistantChat,
    isActive,
    onLoadCurrentChat,
}: Properties): JSX.Element => {
    const chatRouteById = configureString(AppRoute.CHATS_AI_ASSISTANT_$ID, {
        id: String(aiAssistantChat?.id),
    }) as typeof AppRoute.CHATS_AI_ASSISTANT_$ID;

    return (
        <Link to={chatRouteById}>
            <button onClick={onLoadCurrentChat} className="w-full">
                <div
                    className={getValidClassNames(
                        isActive &&
                        'bg-primary border-l-lm-yellow-100 rounded-br-xl rounded-tr-xl border-l-4 p-2',
                        'flex items-center gap-5',
                    )}
                >
                    <Icon name="aiAssistantIcon" className="h-12 w-12" />
                    <div className="flex w-full flex-col items-start gap-1 overflow-hidden py-2 lg:max-w-[9rem]">
                        <p
                            className={getValidClassNames(
                                isActive ? 'text-action' : 'text-primary',
                                'text-sm font-semibold',
                            )}
                        >
                            Personal Assistant
                        </p>
                        <p className="text-secondary truncate text-xs">
                            {aiAssistantChat &&
                                aiAssistantChat.lastMessage?.text}
                        </p>
                    </div>
                    <p className="text-secondary text-xs">
                        {formatChatDate(
                            aiAssistantChat?.lastMessage?.createdAt ?? null,
                            false,
                        )}
                    </p>
                </div>
            </button>
        </Link>
    );
};

export { AiChatLink };
