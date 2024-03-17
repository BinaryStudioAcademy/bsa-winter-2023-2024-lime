type MessageResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    senderId: number | null;
    text: string;
    isSeen: boolean;
};

export { type MessageResponseDto };
