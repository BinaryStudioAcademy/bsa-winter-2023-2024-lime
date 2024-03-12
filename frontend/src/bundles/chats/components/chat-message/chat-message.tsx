import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { formatChatLinkDate } from '../../helpers/format-chat-link-date.helper.js';

type Properties = {
    isCurrentUserMessage: boolean;
    sendDate: Date;
    message: string;
};

const ChatMessage = ({
    isCurrentUserMessage,
    sendDate,
    message,
}: Properties): JSX.Element => {
    return (
        <li
            className={getValidClassNames(
                'w-full max-w-[85%]',
                isCurrentUserMessage ? 'self-end text-end' : 'self-start',
            )}
        >
            <div className="flex flex-col">
                <span className="text-secondary">
                    {formatChatLinkDate(sendDate)}
                </span>
                <div
                    className={`${isCurrentUserMessage ? 'bg-lm-yellow-200 bg-opacity-90 text-start' : 'bg-secondary '} rounded-xl px-3 py-2`}
                >
                    <span className="text-primary">{message}</span>
                </div>
            </div>
        </li>
    );
};

export { ChatMessage };
