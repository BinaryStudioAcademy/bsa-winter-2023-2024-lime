import { type Entity } from '~/common/types/types.js';

class SubscriptionEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'planId': number | null;

    private 'subscriptionToken': string | null;

    private 'cancelAtPeriodEnd': boolean | null;

    private 'status': string | null;

    private 'expirationDate': Date | null;

    private constructor({
        id,
        userId,
        planId,
        status,
        cancelAtPeriodEnd,
        subscriptionToken,
        expirationDate,
    }: {
        id: number | null;
        userId: number;
        planId: number | null;
        status: string | null;
        subscriptionToken: string | null;
        cancelAtPeriodEnd: boolean | null;
        expirationDate: Date | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
        this.status = status;
        this.cancelAtPeriodEnd = cancelAtPeriodEnd;
        this.expirationDate = expirationDate;
        this.subscriptionToken = subscriptionToken;
    }

    public static initialize({
        id,
        userId,
        planId,
        subscriptionToken,
        cancelAtPeriodEnd,
        status,
        expirationDate,
    }: {
        id: number | null;
        userId: number;
        planId: number | null;
        subscriptionToken: string | null;
        cancelAtPeriodEnd: boolean | null;
        status: string | null;
        expirationDate: Date | null;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id,
            userId,
            planId,
            subscriptionToken,
            status,
            cancelAtPeriodEnd,
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
            status: null,
            cancelAtPeriodEnd: null,
            expirationDate: null,
        });
    }

    public toObject(): {
        id: number | null;
        userId: number;
        planId: number | null;
        status: string | null;
        cancelAtPeriodEnd: boolean | null;
        subscriptionToken: string | null;
        expirationDate: Date | null;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            planId: this.planId as number,
            subscriptionToken: this.subscriptionToken,
            status: this.status,
            cancelAtPeriodEnd: this.cancelAtPeriodEnd as boolean,
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
