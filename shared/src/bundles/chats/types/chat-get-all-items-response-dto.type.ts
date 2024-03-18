import { type ChatPreviewResponseDto } from './chat-preview-response-dto.type.js';

type ChatGetAllItemsResponseDto = {
    aiAssistantChat: ChatPreviewResponseDto | null;
    userChats: ChatPreviewResponseDto[];
};

export { type ChatGetAllItemsResponseDto };
