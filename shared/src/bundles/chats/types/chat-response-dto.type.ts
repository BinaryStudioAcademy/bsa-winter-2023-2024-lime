import { type MessageResponseDto } from '../../messages/messages.js';
import { type ChatUsersResponseDto } from './chat-users-response-dto.type.js';

type ChatBasicResponseDto = {
    id: number;
    isAssistant: boolean;
    users?: ChatUsersResponseDto[] | undefined;
};

type ChatPreviewResponseDto = ChatBasicResponseDto & {
    lastMessage: MessageResponseDto;
};

type ChatFullResponseDto = ChatBasicResponseDto & {
    messages: MessageResponseDto[];
};

type ChatResponseDto = ChatPreviewResponseDto | ChatFullResponseDto;

export {
    type ChatFullResponseDto,
    type ChatPreviewResponseDto,
    type ChatResponseDto,
};
