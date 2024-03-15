import { type Entity } from '~/common/types/types.js';

class AiAssistantEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'chatId': number;

    private 'threadId': string;

    private constructor({
        id,
        userId,
        chatId,
        threadId,
    }: {
        id: number | null;
        userId: number;
        chatId: number;
        threadId: string;
    }) {
        this.id = id;
        this.userId = userId;
        this.chatId = chatId;
        this.threadId = threadId;
    }

    public static initialize({
        id,
        userId,
        chatId,
        threadId,
    }: {
        id: number;
        userId: number;
        chatId: number;
        threadId: string;
    }): AiAssistantEntity {
        return new AiAssistantEntity({
            id,
            userId,
            chatId,
            threadId,
        });
    }

    public static initializeNew({
        userId,
        chatId,
        threadId,
    }: {
        userId: number;
        chatId: number;
        threadId: string;
    }): AiAssistantEntity {
        return new AiAssistantEntity({
            id: null,
            userId,
            chatId,
            threadId,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        chatId: number;
        threadId: string;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            chatId: this.chatId,
            threadId: this.threadId,
        };
    }

    public toNewObject(): {
        userId: number;
        chatId: number;
        threadId: string;
    } {
        return {
            userId: this.userId,
            chatId: this.chatId,
            threadId: this.threadId,
        };
    }
}

export { AiAssistantEntity };
