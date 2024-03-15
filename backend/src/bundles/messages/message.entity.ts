import { type Entity } from '~/common/types/types.js';

class MessageEntity implements Entity {
    private 'id': number | null;

    private 'chatId': number;

    private 'senderId': number | null;

    private 'text': string;

    private 'isSeen': boolean;

    private constructor({
        id,
        chatId,
        senderId,
        text,
        isSeen,
    }: {
        id: number | null;
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
    }) {
        this.id = id;
        this.chatId = chatId;
        this.senderId = senderId;
        this.text = text;
        this.isSeen = isSeen;
    }

    public static initialize({
        id,
        chatId,
        senderId,
        text,
        isSeen,
    }: {
        id: number;
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
    }): MessageEntity {
        return new MessageEntity({
            id,
            chatId,
            senderId,
            text,
            isSeen,
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
        return new MessageEntity({
            id: null,
            chatId,
            senderId: senderId ?? null,
            text,
            isSeen,
        });
    }

    public toObject(): {
        id: number;
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
    } {
        return {
            id: this.id as number,
            chatId: this.chatId,
            senderId: this.senderId,
            text: this.text,
            isSeen: this.isSeen,
        };
    }

    public toNewObject(): {
        chatId: number;
        senderId: number | null;
        text: string;
        isSeen: boolean;
    } {
        return {
            chatId: this.chatId,
            senderId: this.senderId ?? null,
            text: this.text,
            isSeen: this.isSeen,
        };
    }
}

export { MessageEntity };
