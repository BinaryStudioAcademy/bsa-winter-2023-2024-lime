import { type MessageRequestDto } from '../../messages/messages.js';

type SendAiMessageRequestDto = MessageRequestDto & {
    contextMessagesCount: number;
};

export { type SendAiMessageRequestDto };
