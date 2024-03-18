import { type MessageResponseDto } from '../../messages/messages.js';
import { type ChatResponseDto } from './chat-response-dto.type.js';

type ChatPreviewResponseDto = ChatResponseDto & {
    lastMessage: MessageResponseDto;
};

export { type ChatPreviewResponseDto };
