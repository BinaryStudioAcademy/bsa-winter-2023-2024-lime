import { type Entity } from '~/common/types/types.js';

class OAuthStateEntity implements Entity {
    private 'id': number | null;

    private 'userId': number | null;

    private 'uuid': string;

    private 'referralCode': string | null;

    private constructor({
        id,
        userId,
        uuid,
        referralCode,
    }: {
        id: number | null;
        userId: number | null;
        uuid: string;
        referralCode: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.uuid = uuid;
        this.referralCode = referralCode;
    }

    public static initialize({
        id,
        userId,
        uuid,
        referralCode,
    }: {
        id: number;
        userId: number | null;
        uuid: string;
        referralCode: string | null;
    }): OAuthStateEntity {
        return new OAuthStateEntity({
            id,
            userId,
            uuid,
            referralCode,
        });
    }

    public static initializeNew({
        userId,
        uuid,
        referralCode,
    }: {
        userId: number | null;
        uuid: string;
        referralCode?: string | null;
    }): OAuthStateEntity {
        return new OAuthStateEntity({
            id: null,
            userId,
            uuid,
            referralCode: referralCode ?? null,
        });
    }

    public toObject(): {
        id: number;
        userId: number | null;
        uuid: string;
        referralCode: string | null;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            uuid: this.uuid,
            referralCode: this.referralCode,
        };
    }

    public toNewObject(): {
        userId: number | null;
        uuid: string;
        referralCode: string | null;
    } {
        return {
            userId: this.userId,
            uuid: this.uuid,
            referralCode: this.referralCode,
        };
    }
}

export { OAuthStateEntity };
