import { type Entity } from '~/common/types/types.js';

class OAuthStateEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'uuid': string;

    private constructor({
        id,
        userId,
        uuid,
    }: {
        id: number | null;
        userId: number;
        uuid: string;
    }) {
        this.id = id;
        this.userId = userId;
        this.uuid = uuid;
    }

    public static initialize({
        id,
        userId,
        uuid,
    }: {
        id: number;
        userId: number;
        uuid: string;
    }): OAuthStateEntity {
        return new OAuthStateEntity({
            id,
            userId,
            uuid,
        });
    }

    public static initializeNew({
        userId,
        uuid,
    }: {
        userId: number;
        uuid: string;
    }): OAuthStateEntity {
        return new OAuthStateEntity({
            id: null,
            userId,
            uuid,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        uuid: string;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            uuid: this.uuid,
        };
    }

    public toNewObject(): {
        userId: number;
        uuid: string;
    } {
        return {
            userId: this.userId,
            uuid: this.uuid,
        };
    }
}

export { OAuthStateEntity };
