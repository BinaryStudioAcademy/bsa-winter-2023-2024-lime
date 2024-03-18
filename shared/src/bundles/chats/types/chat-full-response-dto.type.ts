import { type MessageResponseDto } from '../../messages/messages.js';
import { type ChatResponseDto } from './chat-response-dto.type.js';

type ChatFullResponseDto = ChatResponseDto & {
    messages: MessageResponseDto[];
};

export { type ChatFullResponseDto };
