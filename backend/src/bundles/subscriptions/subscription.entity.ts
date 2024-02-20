import { type Entity } from '~/common/types/types.js';

class SubscriptionEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'planId': number;

    private 'subscriptionToken': string;

    private 'status': string;

    private 'expirationDate': Date;

    private constructor({
        id,
        userId,
        planId,
        subscriptionToken,
        status,
        expirationDate,
    }: {
        id: number | null;
        userId: number;
        planId: number;
        subscriptionToken: string;
        status: string;
        expirationDate: Date;
    }) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
        this.subscriptionToken = subscriptionToken;
        this.status = status;
        this.expirationDate = expirationDate;
    }

    public static initialize({
        id,
        userId,
        planId,
        subscriptionToken,
        status,
        expirationDate,
    }: {
        id: number | null;
        userId: number;
        planId: number;
        subscriptionToken: string;
        status: string;
        expirationDate: Date;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id,
            userId,
            planId,
            subscriptionToken,
            status,
            expirationDate,
        });
    }

    public static initializeNew({
        userId,
        planId,
        subscriptionToken,
        status,
        expirationDate,
    }: {
        userId: number;
        planId: number;
        subscriptionToken: string;
        customerToken: string;
        status: string;
        expirationDate: Date;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id: null,
            userId,
            planId,
            subscriptionToken,
            status,
            expirationDate,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        planId: number;
        subscriptionToken: string;
        status: string;
        expirationDate: Date;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            planId: this.planId,
            subscriptionToken: this.subscriptionToken,
            status: this.status,
            expirationDate: this.expirationDate,
        };
    }

    public toNewObject(): {
        userId: number;
        planId: number;
        subscriptionToken: string;
        status: string;
        expirationDate: Date;
    } {
        return {
            userId: this.userId,
            planId: this.planId,
            subscriptionToken: this.subscriptionToken,
            status: this.status,
            expirationDate: this.expirationDate,
        };
    }
}

export { SubscriptionEntity };
