import { Icon, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { formatChatDate } from '../../helpers/helpers.js';
import { type ChatPreviewResponseDto } from '../../types/types.js';

type Properties = {
    aiAssistantChat: ChatPreviewResponseDto | null;
};

const AiChatLink = ({ aiAssistantChat }: Properties): JSX.Element => {
    const isActive = true;

    return (
        <Link to={AppRoute.CHATS_AI_ASSISTANT}>
            <div
                className={getValidClassNames(
                    isActive &&
                        'bg-primary border-l-lm-yellow-100 rounded-br-xl rounded-tr-xl border-l-4 p-2',
                    'flex items-center gap-5',
                )}
            >
                <Icon name="aiAssistantIcon" className="h-12 w-12" />
                <div className="flex w-full flex-col gap-1 overflow-hidden text-ellipsis whitespace-nowrap py-2 lg:max-w-[9rem]">
                    <p
                        className={getValidClassNames(
                            isActive ? 'text-action' : 'text-primary',
                            'text-sm',
                        )}
                    >
                        Personal Assistant
                    </p>
                    <p className="text-secondary text-xs">
                        {aiAssistantChat && aiAssistantChat.lastMessage?.text}
                    </p>
                </div>
                <p className="text-secondary text-xs">
                    {formatChatDate(
                        aiAssistantChat &&
                            aiAssistantChat.lastMessage?.createdAt,
                    )}
                </p>
            </div>
        </Link>
    );
};

export { AiChatLink };
