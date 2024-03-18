import { type ChatResponseDto } from './chat-response-dto.type.js';

type ChatGetAllItemsResponseDto = {
    aiAssistantChat: ChatResponseDto | null;
    userChats: ChatResponseDto[] | null;
};

export { type ChatGetAllItemsResponseDto };
