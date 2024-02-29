import { type Entity } from '~/common/types/types.js';

class UserReferralEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'referralCode': string;

    private 'referralUserId': number | null;

    public 'balance': number | null;

    public 'referralsCount': number | null;

    private constructor({
        id,
        userId,
        referralUserId,
        referralCode,
        balance,
        referralsCount,
    }: {
        id: number | null;
        userId: number;
        referralCode: string;
        referralUserId: number | null;
        balance: number | null;
        referralsCount: number | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.referralUserId = referralUserId;
        this.referralCode = referralCode;
        this.balance = balance;
        this.referralsCount = referralsCount;
    }

    public static initialize({
        id,
        userId,
        referralUserId,
        referralCode,
        balance,
        referralsCount,
    }: {
        id: number;
        userId: number;
        referralCode: string;
        referralUserId: number | null;
        balance: number | null;
        referralsCount: number | null;
    }): UserReferralEntity {
        return new UserReferralEntity({
            id,
            userId,
            referralUserId,
            referralCode,
            balance,
            referralsCount,
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
            balance: null,
            referralsCount: null,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        referralUserId: number;
        referralCode: string;
        balance: number;
        referralsCount: number;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            referralUserId: this.referralUserId as number,
            referralCode: this.referralCode,
            balance: this.balance as number,
            referralsCount: this.referralsCount as number,
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
