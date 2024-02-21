import { type Entity } from '~/common/types/types.js';

class SubscriptionEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'planId': number | null;

    private 'subscriptionToken': string | null;

    private 'customerToken': string | null;

    private 'status': string | null;

    private 'expirationDate': Date | null;

    private constructor({
        id,
        userId,
        planId,
        status,
        subscriptionToken,
        customerToken,
        expirationDate,
    }: {
        id: number | null;
        userId: number;
        planId: number | null;
        status: string | null;
        subscriptionToken: string | null;
        customerToken: string | null;
        expirationDate: Date | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
        this.customerToken = customerToken;
        this.status = status;
        this.expirationDate = expirationDate;
        this.subscriptionToken = subscriptionToken;
    }

    public static initialize({
        id,
        userId,
        planId,
        customerToken,
        subscriptionToken,
        status,
        expirationDate,
    }: {
        id: number | null;
        userId: number;
        planId: number | null;
        status: string | null;
        subscriptionToken: string | null;
        customerToken: string | null;
        expirationDate: Date | null;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id,
            userId,
            planId,
            customerToken,
            subscriptionToken,
            status,
            expirationDate,
        });
    }

    public static initializeNew({
        userId,
    }: {
        userId: number;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id: null,
            userId,
            planId: null,
            subscriptionToken: null,
            customerToken: null,
            status: null,
            expirationDate: null,
        });
    }

    public toObject(): {
        id: number | null;
        userId: number;
        planId: number | null;
        status: string | null;
        subscriptionToken: string | null;
        customerToken: string | null;
        expirationDate: Date | null;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            planId: this.planId as number,
            customerToken: this.customerToken,
            subscriptionToken: this.subscriptionToken,
            status: this.status,
            expirationDate: this.expirationDate as Date,
        };
    }

    public toNewObject(): {
        userId: number;
    } {
        return {
            userId: this.userId,
        };
    }
}

export { SubscriptionEntity };
