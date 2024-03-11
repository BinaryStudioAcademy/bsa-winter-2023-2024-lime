import { Icon, Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useParams } from '~/bundles/common/hooks/hooks.js';

import { formatChatLinkDate } from '../../helpers/helpers.js';

type Properties = {
    lastMessage: string;
};

const AiChatLink = ({ lastMessage }: Properties): JSX.Element => {
    const { id: parameterId } = useParams<{ id: string }>();
    const isActive = parameterId === 'ai-assistant';

    return (
        <Link to={AppRoute.CHATS_AI_ASSISTANT}>
            <div
                className={`flex items-center gap-5 ${isActive && 'bg-secondary border-l-lm-yellow-100 rounded-br-xl rounded-tr-xl border-l-4 p-2'}`}
            >
                <Icon name="aiAssistantIcon" className="h-12 w-12" />
                <div className="flex w-full max-w-[9rem] flex-col gap-1 overflow-hidden text-ellipsis whitespace-nowrap py-2">
                    <p
                        className={`${isActive ? 'text-action' : 'text-primary'} text-sm`}
                    >
                        Personal Assistant
                    </p>
                    <p className="text-secondary text-xs">{lastMessage}</p>
                </div>
                <p className="text-secondary text-xs">
                    {formatChatLinkDate(new Date())}
                </p>
            </div>
        </Link>
    );
};

export { AiChatLink };
