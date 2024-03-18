import { type ChatResponseDto } from './chat-response-dto.type.js';

type ChatGetAllItemsResponseDto = {
    aiAssistantChat: ChatResponseDto | null;
    userChats: ChatResponseDto[];
};

export { type ChatGetAllItemsResponseDto };
