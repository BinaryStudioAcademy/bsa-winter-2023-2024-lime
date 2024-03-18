import { formatChatDate } from '~/bundles/chats/helpers/format-chat-date.helper.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = {
    isCurrentUserMessage: boolean;
    sendDate: string;
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
                isCurrentUserMessage ? 'self-end text-end' : 'self-start',
                'w-fit max-w-[85%]',
            )}
        >
            <div className="flex flex-col">
                <span className="text-secondary">
                    {formatChatDate(sendDate)}
                </span>
                <div
                    className={getValidClassNames(
                        isCurrentUserMessage
                            ? 'bg-lm-yellow-200 bg-opacity-90 text-start'
                            : 'bg-primary ',
                        'rounded-xl px-3 py-2',
                    )}
                >
                    <span className="text-primary">{message}</span>
                </div>
            </div>
        </li>
    );
};

export { ChatMessage };
