import { type Entity } from '~/common/types/types.js';

class MessageEntity implements Entity {
    private 'id': number | null;

    private 'chatId': number;

    private 'senderId': number | null;

    private 'text': string;

    private 'isSeen': boolean;

    private 'createdAt': string;

    private 'updatedAt': string;

    private constructor({
        id,
        chatId,
        senderId,
        text,
        isSeen,
        createdAt,
        updatedAt,
    }: {
        id: number | null;
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
        createdAt: string;
        updatedAt: string;
    }) {
        this.id = id;
        this.chatId = chatId;
        this.senderId = senderId;
        this.text = text;
        this.isSeen = isSeen;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static initialize({
        id,
        chatId,
        senderId,
        text,
        isSeen,
        createdAt,
        updatedAt,
    }: {
        id: number;
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
        createdAt: string;
        updatedAt: string;
    }): MessageEntity {
        return new MessageEntity({
            id,
            chatId,
            senderId,
            text,
            isSeen,
            createdAt,
            updatedAt,
        });
    }

    public static initializeNew({
        chatId,
        senderId,
        text,
        isSeen,
    }: {
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
    }): MessageEntity {
        const creationDate = new Date().toISOString();

        return new MessageEntity({
            id: null,
            chatId,
            senderId: senderId ?? null,
            text,
            isSeen,
            createdAt: creationDate,
            updatedAt: creationDate,
        });
    }

    public toObject(): {
        id: number;
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
        createdAt: string;
        updatedAt: string;
    } {
        return {
            id: this.id as number,
            chatId: this.chatId,
            senderId: this.senderId,
            text: this.text,
            isSeen: this.isSeen,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public toNewObject(): {
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
        createdAt: string;
        updatedAt: string;
    } {
        return {
            chatId: this.chatId,
            senderId: this.senderId ?? null,
            text: this.text,
            isSeen: this.isSeen,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

export { MessageEntity };
