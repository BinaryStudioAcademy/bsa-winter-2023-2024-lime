type MessageResponseDto = {
    id: number;
    chatId: number;
    createdAt: string;
    updatedAt: string;
    senderId: number | null;
    text: string;
    isSeen: boolean;
};

export { type MessageResponseDto };
