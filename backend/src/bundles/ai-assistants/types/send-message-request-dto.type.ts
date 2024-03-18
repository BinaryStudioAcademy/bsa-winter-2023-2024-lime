type SendMessageRequestDto = {
    userId: number;
    chatId: number;
    message: string;
    contextMessagesCount: number;
};

export { type SendMessageRequestDto };
