import { type Entity } from '~/common/types/types.js';

class AiAssistantEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'chatId': number;

    private 'assistantId': string;

    private 'threadId': string;

    private constructor({
        id,
        userId,
        chatId,
        assistantId,
        threadId,
    }: {
        id: number | null;
        userId: number;
        chatId: number;
        assistantId: string;
        threadId: string;
    }) {
        this.id = id;
        this.userId = userId;
        this.chatId = chatId;
        this.assistantId = assistantId;
        this.threadId = threadId;
    }

    public static initialize({
        id,
        userId,
        chatId,
        assistantId,
        threadId,
    }: {
        id: number;
        userId: number;
        chatId: number;
        assistantId: string;
        threadId: string;
    }): AiAssistantEntity {
        return new AiAssistantEntity({
            id,
            userId,
            chatId,
            assistantId,
            threadId,
        });
    }

    public static initializeNew({
        userId,
        chatId,
        assistantId,
        threadId,
    }: {
        userId: number;
        chatId: number;
        assistantId: string;
        threadId: string;
    }): AiAssistantEntity {
        return new AiAssistantEntity({
            id: null,
            userId,
            chatId,
            assistantId,
            threadId,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        chatId: number;
        assistantId: string;
        threadId: string;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            chatId: this.chatId,
            assistantId: this.assistantId,
            threadId: this.threadId,
        };
    }

    public toNewObject(): {
        userId: number;
        chatId: number;
        assistantId: string;
        threadId: string;
    } {
        return {
            userId: this.userId,
            chatId: this.chatId,
            assistantId: this.assistantId,
            threadId: this.threadId,
        };
    }
}

export { AiAssistantEntity };
