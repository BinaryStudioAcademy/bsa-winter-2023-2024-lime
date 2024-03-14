import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type SenderType } from './enums/enums.js';

class MessageEntity implements Entity {
    private 'id': number | null;

    private 'chatId': number;

    private 'senderType': ValueOf<typeof SenderType>;

    private 'text': string;

    private 'isSeen': boolean;

    private constructor({
        id,
        chatId,
        senderType,
        text,
        isSeen,
    }: {
        id: number | null;
        chatId: number;
        senderType: ValueOf<typeof SenderType>;
        text: string;
        isSeen: boolean;
    }) {
        this.id = id;
        this.chatId = chatId;
        this.senderType = senderType;
        this.text = text;
        this.isSeen = isSeen;
    }

    public static initialize({
        id,
        chatId,
        senderType,
        text,
        isSeen,
    }: {
        id: number;
        chatId: number;
        senderType: ValueOf<typeof SenderType>;
        text: string;
        isSeen: boolean;
    }): MessageEntity {
        return new MessageEntity({
            id,
            chatId,
            senderType,
            text,
            isSeen,
        });
    }

    public static initializeNew({
        chatId,
        senderType,
        text,
        isSeen,
    }: {
        chatId: number;
        senderType: ValueOf<typeof SenderType>;
        text: string;
        isSeen: boolean;
    }): MessageEntity {
        return new MessageEntity({
            id: null,
            chatId,
            senderType,
            text,
            isSeen,
        });
    }

    public toObject(): {
        id: number;
        chatId: number;
        senderType: ValueOf<typeof SenderType>;
        text: string;
        isSeen: boolean;
    } {
        return {
            id: this.id as number,
            chatId: this.chatId,
            senderType: this.senderType,
            text: this.text,
            isSeen: this.isSeen,
        };
    }

    public toNewObject(): {
        chatId: number;
        senderType: ValueOf<typeof SenderType>;
        text: string;
        isSeen: boolean;
    } {
        return {
            chatId: this.chatId,
            senderType: this.senderType,
            text: this.text,
            isSeen: this.isSeen,
        };
    }
}

export { MessageEntity };
