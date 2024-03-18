import { type MessageResponseDto } from '../../messages/messages.js';
import { type ChatUsersResponseDto } from './chat-users-response-dto.type.js';

type ChatResponseDto = {
    id: number;
    isAssistant: boolean;
    messages: MessageResponseDto[] | undefined;
    lastMessage: MessageResponseDto | undefined;
    users?: ChatUsersResponseDto[] | undefined;
};

export { type ChatResponseDto };
