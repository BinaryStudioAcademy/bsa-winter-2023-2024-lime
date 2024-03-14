import { type Entity, type ValueOf } from '~/common/types/types.js';

import {
    type UserBonusActionType,
    type UserBonusTransactionType,
} from './enums/enums.js';

class UserBonusEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'actionType': ValueOf<typeof UserBonusActionType>;

    private 'transactionType': ValueOf<typeof UserBonusTransactionType>;

    private 'amount': number;

    private 'createdAt': string | null;

    private constructor({
        id,
        userId,
        actionType,
        transactionType,
        amount,
        createdAt,
    }: {
        id: number | null;
        userId: number;
        actionType: ValueOf<typeof UserBonusActionType>;
        transactionType: ValueOf<typeof UserBonusTransactionType>;
        amount: number;
        createdAt: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.actionType = actionType;
        this.transactionType = transactionType;
        this.amount = amount;
        this.createdAt = createdAt;
    }

    public static initialize({
        id,
        userId,
        actionType,
        transactionType,
        amount,
        createdAt,
    }: {
        id: number;
        userId: number;
        actionType: ValueOf<typeof UserBonusActionType>;
        transactionType: ValueOf<typeof UserBonusTransactionType>;
        amount: number;
        createdAt: string | null;
    }): UserBonusEntity {
        return new UserBonusEntity({
            id,
            userId,
            actionType,
            transactionType,
            amount,
            createdAt,
        });
    }

    public static initializeNew({
        userId,
        actionType,
        transactionType,
        amount,
    }: {
        userId: number;
        actionType: ValueOf<typeof UserBonusActionType>;
        transactionType: ValueOf<typeof UserBonusTransactionType>;
        amount: number;
    }): UserBonusEntity {
        return new UserBonusEntity({
            id: null,
            userId,
            actionType,
            transactionType,
            amount,
            createdAt: null,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        actionType: ValueOf<typeof UserBonusActionType>;
        transactionType: ValueOf<typeof UserBonusTransactionType>;
        amount: number;
        createdAt: string | null;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            actionType: this.actionType,
            transactionType: this.transactionType,
            amount: this.amount,
            createdAt: this.createdAt,
        };
    }

    public toNewObject(): {
        userId: number;
        actionType: ValueOf<typeof UserBonusActionType>;
        transactionType: ValueOf<typeof UserBonusTransactionType>;
        amount: number;
    } {
        return {
            userId: this.userId,
            actionType: this.actionType,
            transactionType: this.transactionType,
            amount: this.amount,
        };
    }
}

export { UserBonusEntity };
