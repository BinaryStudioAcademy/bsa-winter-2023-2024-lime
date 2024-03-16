import { type Entity } from '~/common/types/types.js';

class ChatEntity implements Entity {
    private 'id': number | null;

    private 'isAssistant': boolean;

    private constructor({
        id,
        isAssistant,
    }: {
        id: number | null;
        isAssistant: boolean;
    }) {
        this.id = id;
        this.isAssistant = isAssistant;
    }

    public static initialize({
        id,
        isAssistant,
    }: {
        id: number;
        isAssistant: boolean;
    }): ChatEntity {
        return new ChatEntity({ id, isAssistant });
    }

    public static initializeNew({
        isAssistant,
    }: {
        isAssistant: boolean;
    }): ChatEntity {
        return new ChatEntity({ id: null, isAssistant });
    }

    public toObject(): { id: number; isAssistant: boolean } {
        return { id: this.id as number, isAssistant: this.isAssistant };
    }

    public toNewObject(): { isAssistant: boolean } {
        return { isAssistant: this.isAssistant };
    }
}

export { ChatEntity };
