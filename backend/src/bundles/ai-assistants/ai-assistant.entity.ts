import { type Entity } from '~/common/types/types.js';

class AiAssistantEntity implements Entity {
    private 'id': number | null;

    private 'assistantId': string;

    private 'threadId': string;

    private constructor({
        id,
        assistantId,
        threadId,
    }: {
        id: number | null;
        assistantId: string;
        threadId: string;
    }) {
        this.id = id;
        this.assistantId = assistantId;
        this.threadId = threadId;
    }

    public static initialize({
        id,
        assistantId,
        threadId,
    }: {
        id: number;
        assistantId: string;
        threadId: string;
    }): AiAssistantEntity {
        return new AiAssistantEntity({ id, assistantId, threadId });
    }

    public static initializeNew({
        assistantId,
        threadId,
    }: {
        assistantId: string;
        threadId: string;
    }): AiAssistantEntity {
        return new AiAssistantEntity({ id: null, assistantId, threadId });
    }

    public toObject(): { id: number; assistantId: string; threadId: string } {
        return {
            id: this.id as number,
            assistantId: this.assistantId,
            threadId: this.threadId,
        };
    }

    public toNewObject(): { assistantId: string; threadId: string } {
        return { assistantId: this.assistantId, threadId: this.threadId };
    }
}

export { AiAssistantEntity };
