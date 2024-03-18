import { type ChatCompletionMessageParam } from 'openai/resources/chat/index.js';

import { type MessageResponseDto } from '~/bundles/chats/types/types.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';

const getContextMessages = (
    items: MessageResponseDto[],
    contextMessagesCount: number,
): ChatCompletionMessageParam[] => {
    return items.slice(contextMessagesCount * -1).map((message) => {
        return {
            role: message.senderId ? SenderType.USER : SenderType.ASSISTANT,
            content: message.text,
        };
    });
};

export { getContextMessages };
