import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type OAuthType } from './enums/enums.js';

class OAuthStateEntity implements Entity {
    private 'id': number | null;

    private 'userId': number | null;

    private 'uuid': string;

    private 'type': ValueOf<typeof OAuthType>;

    private constructor({
        id,
        userId,
        uuid,
        type,
    }: {
        id: number | null;
        userId: number | null;
        uuid: string;
        type: ValueOf<typeof OAuthType>;
    }) {
        this.id = id;
        this.userId = userId;
        this.uuid = uuid;
        this.type = type;
    }

    public static initialize({
        id,
        userId,
        uuid,
        type,
    }: {
        id: number;
        userId: number | null;
        uuid: string;
        type: ValueOf<typeof OAuthType>;
    }): OAuthStateEntity {
        return new OAuthStateEntity({
            id,
            userId,
            uuid,
            type,
        });
    }

    public static initializeNew({
        userId,
        uuid,
        type,
    }: {
        userId: number | null;
        uuid: string;
        type: ValueOf<typeof OAuthType>;
    }): OAuthStateEntity {
        return new OAuthStateEntity({
            id: null,
            userId,
            uuid,
            type,
        });
    }

    public toObject(): {
        id: number;
        userId: number | null;
        uuid: string;
        type: ValueOf<typeof OAuthType>;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            uuid: this.uuid,
            type: this.type,
        };
    }

    public toNewObject(): {
        userId: number | null;
        uuid: string;
        type: ValueOf<typeof OAuthType>;
    } {
        return {
            userId: this.userId,
            uuid: this.uuid,
            type: this.type,
        };
    }
}

export { OAuthStateEntity };
