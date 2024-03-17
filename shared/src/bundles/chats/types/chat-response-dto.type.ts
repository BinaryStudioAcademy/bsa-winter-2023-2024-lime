import { type MessageResponseDto } from '../../messages/messages.js';

type ChatResponseDto = {
    id: number;
    isAssistant: boolean;
    messages: MessageResponseDto[] | undefined;
    lastMessage: MessageResponseDto | undefined;
};

export { type ChatResponseDto };
