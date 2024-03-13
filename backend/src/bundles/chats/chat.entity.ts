import { type Entity } from '~/common/types/types.js';

class ChatEntity implements Entity {
    private 'id': number | null;

    private constructor({ id }: { id: number | null }) {
        this.id = id;
    }

    public static initialize({ id }: { id: number }): ChatEntity {
        return new ChatEntity({ id });
    }

    public static initializeNew(): ChatEntity {
        return new ChatEntity({ id: null });
    }

    public toObject(): { id: number } {
        return { id: this.id as number };
    }

    public toNewObject(): object {
        return {};
    }
}

export { ChatEntity };
