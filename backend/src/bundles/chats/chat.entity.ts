import {
    type MessageModel,
    MessageEntity,
} from '~/bundles/messages/messages.js';
import { type Entity } from '~/common/types/types.js';

import { type MessageResponseDto } from './types/types.js';

class ChatEntity implements Entity {
    private 'id': number | null;

    private 'isAssistant': boolean;

    private 'membersId': number[] | null;

    private 'messages': MessageEntity[] | undefined;

    private 'lastMessage': MessageEntity | undefined;

    private constructor({
        id,
        isAssistant,
        membersId,
        messages,
        lastMessage,
    }: {
        id: number | null;
        isAssistant: boolean;
        membersId: number[] | null;
        messages: MessageEntity[] | undefined;
        lastMessage: MessageEntity | undefined;
    }) {
        this.id = id;
        this.isAssistant = isAssistant;
        this.membersId = membersId;
        this.messages = messages;
        this.lastMessage = lastMessage;
    }

    public static initialize({
        id,
        isAssistant,
        messages,
        lastMessage,
    }: {
        id: number;
        isAssistant: boolean;
        messages: MessageModel[] | undefined;
        lastMessage: MessageModel | undefined;
    }): ChatEntity {
        return new ChatEntity({
            id,
            isAssistant,
            membersId: null,
            messages:
                messages &&
                messages.map((message) => MessageEntity.initialize(message)),
            lastMessage: lastMessage && MessageEntity.initialize(lastMessage),
        });
    }

    public static initializeNew({
        isAssistant,
        membersId,
    }: {
        isAssistant: boolean;
        membersId: number[];
    }): ChatEntity {
        return new ChatEntity({
            id: null,
            isAssistant,
            membersId,
            messages: [],
            lastMessage: undefined,
        });
    }

    public toObject(): {
        id: number;
        isAssistant: boolean;
        messages: MessageResponseDto[] | undefined;
        lastMessage: MessageResponseDto | undefined;
    } {
        return {
            id: this.id as number,
            isAssistant: this.isAssistant,
            messages:
                this.messages &&
                this.messages.map((message) => message.toObject()),
            lastMessage: this.lastMessage && this.lastMessage.toObject(),
        };
    }

    public toNewObject(): {
        isAssistant: boolean;
        membersId: number[];
        messages: [];
    } {
        return {
            isAssistant: this.isAssistant,
            membersId: this.membersId as number[],
            messages: [],
        };
    }
}

export { ChatEntity };
