import { type Entity } from '~/common/types/types.js';

class ReferralTransactionEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'referralUserId': number;

    private 'referralCode': string;

    private constructor({
        id,
        userId,
        referralUserId,
        referralCode,
    }: {
        id: number | null;
        userId: number;
        referralUserId: number;
        referralCode: string;
    }) {
        this.id = id;
        this.userId = userId;
        this.referralUserId = referralUserId;
        this.referralCode = referralCode;
    }

    public static initialize({
        id,
        userId,
        referralUserId,
        referralCode,
    }: {
        id: number;
        userId: number;
        referralUserId: number;
        referralCode: string;
    }): ReferralTransactionEntity {
        return new ReferralTransactionEntity({
            id,
            userId,
            referralUserId,
            referralCode,
        });
    }

    public static initializeNew({
        userId,
        referralUserId,
        referralCode,
    }: {
        userId: number;
        referralUserId: number;
        referralCode: string;
    }): ReferralTransactionEntity {
        return new ReferralTransactionEntity({
            id: null,
            userId,
            referralUserId,
            referralCode,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        referralUserId: number;
        referralCode: string;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            referralUserId: this.referralUserId,
            referralCode: this.referralCode,
        };
    }

    public toNewObject(): {
        userId: number;
        referralUserId: number;
        referralCode: string;
    } {
        return {
            userId: this.userId,
            referralUserId: this.referralUserId,
            referralCode: this.referralCode,
        };
    }
}

export { ReferralTransactionEntity };
