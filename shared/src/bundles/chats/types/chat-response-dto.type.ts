import { type MessageResponseDto } from '../../messages/messages.js';

type ChatResponseDto = {
    id: number;
    isAssistant: boolean;
    messages: MessageResponseDto[];
};

export { type ChatResponseDto };
