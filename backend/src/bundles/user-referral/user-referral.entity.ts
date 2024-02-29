import { type Entity } from '~/common/types/types.js';

class UserReferralEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'referralUserId': number | null;

    private 'referralCode': string;

    private constructor({
        id,
        userId,
        referralUserId,
        referralCode,
    }: {
        id: number | null;
        userId: number;
        referralUserId: number | null;
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
        referralUserId: number | null;
        referralCode: string;
    }): UserReferralEntity {
        return new UserReferralEntity({
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
        referralUserId: number | null;
        referralCode: string;
    }): UserReferralEntity {
        return new UserReferralEntity({
            id: null,
            userId,
            referralUserId,
            referralCode,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        referralUserId: number | null;
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
        referralUserId: number | null;
        referralCode: string;
    } {
        return {
            userId: this.userId,
            referralUserId: this.referralUserId,
            referralCode: this.referralCode,
        };
    }
}

export { UserReferralEntity };
