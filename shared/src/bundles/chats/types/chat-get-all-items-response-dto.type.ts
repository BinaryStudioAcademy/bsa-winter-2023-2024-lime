import { type ChatPreviewResponseDto } from './types.js';

type ChatGetAllItemsResponseDto = {
    aiAssistantChat: ChatPreviewResponseDto | null;
    userChats: ChatPreviewResponseDto[];
};

export { type ChatGetAllItemsResponseDto };
