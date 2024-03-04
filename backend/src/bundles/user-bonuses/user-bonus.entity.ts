import { type Entity } from '~/common/types/types.js';

class UserBonusEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'action': string;

    private 'amount': number;

    private constructor({
        id,
        userId,
        action,
        amount,
    }: {
        id: number | null;
        userId: number;
        action: string;
        amount: number;
    }) {
        this.id = id;
        this.userId = userId;
        this.action = action;
        this.amount = amount;
    }

    public static initialize({
        id,
        userId,
        action,
        amount,
    }: {
        id: number;
        userId: number;
        action: string;
        amount: number;
    }): UserBonusEntity {
        return new UserBonusEntity({
            id,
            userId,
            action,
            amount,
        });
    }

    public static initializeNew({
        userId,
        action,
        amount,
    }: {
        userId: number;
        action: string;
        amount: number;
    }): UserBonusEntity {
        return new UserBonusEntity({
            id: null,
            userId,
            action,
            amount,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        action: string;
        amount: number;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            action: this.action,
            amount: this.amount,
        };
    }

    public toNewObject(): {
        userId: number;
        action: string;
        amount: number;
    } {
        return {
            userId: this.userId,
            action: this.action,
            amount: this.amount,
        };
    }
}

export { UserBonusEntity };
