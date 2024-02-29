import { type Entity } from '~/common/types/types.js';

class ReferralTransactionEntity implements Entity {
    private 'id': number | null;

    private 'referringUserId': number;

    private 'referredUserId': number;

    private constructor({
        id,
        referringUserId,
        referredUserId,
    }: {
        id: number | null;
        referringUserId: number;
        referredUserId: number;
    }) {
        this.id = id;
        this.referringUserId = referringUserId;
        this.referredUserId = referredUserId;
    }

    public static initialize({
        id,
        referringUserId,
        referredUserId,
    }: {
        id: number;
        referringUserId: number;
        referredUserId: number;
    }): ReferralTransactionEntity {
        return new ReferralTransactionEntity({
            id,
            referringUserId,
            referredUserId,
        });
    }

    public static initializeNew({
        referringUserId,
        referredUserId,
    }: {
        referringUserId: number;
        referredUserId: number;
    }): ReferralTransactionEntity {
        return new ReferralTransactionEntity({
            id: null,
            referringUserId,
            referredUserId,
        });
    }

    public toObject(): {
        id: number;
        referringUserId: number;
        referredUserId: number;
    } {
        return {
            id: this.id as number,
            referringUserId: this.referringUserId,
            referredUserId: this.referredUserId,
        };
    }

    public toNewObject(): {
        referringUserId: number;
        referredUserId: number;
    } {
        return {
            referringUserId: this.referringUserId,
            referredUserId: this.referredUserId,
        };
    }
}

export { ReferralTransactionEntity };
