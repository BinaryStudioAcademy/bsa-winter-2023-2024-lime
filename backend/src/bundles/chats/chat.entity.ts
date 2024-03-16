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

    private 'messages': MessageEntity[];

    private constructor({
        id,
        isAssistant,
        membersId,
        messages,
    }: {
        id: number | null;
        isAssistant: boolean;
        membersId: number[] | null;
        messages: MessageEntity[];
    }) {
        this.id = id;
        this.isAssistant = isAssistant;
        this.membersId = membersId;
        this.messages = messages;
    }

    public static initialize({
        id,
        isAssistant,
        messages,
    }: {
        id: number;
        isAssistant: boolean;
        messages: MessageModel[];
    }): ChatEntity {
        return new ChatEntity({
            id,
            isAssistant,
            membersId: null,
            messages: messages.map((message) =>
                MessageEntity.initialize(message),
            ),
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
        });
    }

    public toObject(): {
        id: number;
        isAssistant: boolean;
        messages: MessageResponseDto[];
    } {
        return {
            id: this.id as number,
            isAssistant: this.isAssistant,
            messages: this.messages.map((message) => message.toObject()),
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
