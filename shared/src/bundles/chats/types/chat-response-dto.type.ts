import { type MessageResponseDto } from '../../messages/messages.js';
import { type ChatUserResponseDto } from './chat-user-response-dto.type.js';

type ChatBasicResponseDto = {
    id: number;
    isAssistant: boolean;
    users: ChatUserResponseDto[];
    creatorId?: number;
};

type ChatPreviewResponseDto = ChatBasicResponseDto & {
    lastMessage: MessageResponseDto | null;
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
