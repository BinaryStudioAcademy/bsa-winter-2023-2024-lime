import { type ChatCompletionMessageParam } from 'openai/resources/chat/index.js';

import { type MessageResponseDto } from '~/bundles/chats/types/types.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';

const checkMessageTimeDifference = (
    timeDifferece: number,
    time?: string,
): boolean => {
    if (!time) {
        return true;
    }

    const differenceMs = Math.abs(Date.now() - new Date(time).getTime());
    const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
    return differenceMinutes > timeDifferece;
};

const getContextMessages = (
    items: MessageResponseDto[],
): ChatCompletionMessageParam[] => {
    const MAX_CONTEXT_TIME_DIFFERENCE = 5;

    if (
        checkMessageTimeDifference(
            MAX_CONTEXT_TIME_DIFFERENCE,
            items[0]?.createdAt,
        )
    ) {
        return [];
    }

    return items.reverse().map((message) => {
        return {
            role: message.senderId ? SenderType.USER : SenderType.ASSISTANT,
            content: message.text,
        };
    });
};

export { getContextMessages };
