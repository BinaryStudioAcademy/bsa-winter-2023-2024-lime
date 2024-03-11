import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { formatChatLinkDate } from '../../helpers/format-chat-link-date.helper.js';

type Properties = {
    isCurrentUserMessage: boolean;
    date: Date;
    message: string;
};

const ChatMessage = ({
    isCurrentUserMessage,
    date,
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
                    {formatChatLinkDate(date)}
                </span>
                <div
                    className={`${isCurrentUserMessage ? 'bg-lm-yellow-200 bg-opacity-90 text-start' : 'bg-secondary '} text-primary rounded-xl px-3 py-2`}
                >
                    <span>{message}</span>
                </div>
            </div>
        </li>
    );
};

export { ChatMessage };
