import { formatChatDate } from '~/bundles/chats/helpers/helpers.js';
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
                    {formatChatDate(sendDate, true)}
                </span>
                <div
                    className={getValidClassNames(
                        isCurrentUserMessage
                            ? 'bg-lm-yellow-200 bg-opacity-90 text-start'
                            : 'bg-primary ',
                        'rounded-xl px-3 py-2',
                    )}
                >
                    <span className="text-primary whitespace-pre-line">{message}</span>
                </div>
            </div>
        </li>
    );
};

export { ChatMessage };
