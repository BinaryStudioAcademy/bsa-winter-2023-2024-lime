import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type SubscriptionStatus } from './enums/enums.js';

class SubscriptionEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'planId': number;

    private 'subscriptionToken': string;

    private 'cancelAtPeriodEnd': boolean;

    private 'status': ValueOf<typeof SubscriptionStatus>;

    private 'expirationDate': Date;

    private 'subscriptionPlanName': string | null;

    private 'subscriptionPlanPrice': number | null;

    private 'subscriptionPlanDescription': string | null;

    private constructor({
        id,
        userId,
        planId,
        status,
        cancelAtPeriodEnd,
        subscriptionToken,
        expirationDate,
        subscriptionPlanName,
        subscriptionPlanPrice,
        subscriptionPlanDescription,
    }: {
        id: number | null;
        userId: number;
        planId: number;
        status: ValueOf<typeof SubscriptionStatus>;
        subscriptionToken: string;
        cancelAtPeriodEnd: boolean;
        expirationDate: Date;
        subscriptionPlanName: string | null;
        subscriptionPlanPrice: number | null;
        subscriptionPlanDescription: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
        this.status = status;
        this.cancelAtPeriodEnd = cancelAtPeriodEnd;
        this.expirationDate = expirationDate;
        this.subscriptionToken = subscriptionToken;
        this.subscriptionPlanName = subscriptionPlanName;
        this.subscriptionPlanPrice = subscriptionPlanPrice;
        this.subscriptionPlanDescription = subscriptionPlanDescription;
    }

    public static initialize({
        id,
        userId,
        planId,
        subscriptionToken,
        cancelAtPeriodEnd,
        status,
        expirationDate,
        subscriptionPlanName,
        subscriptionPlanPrice,
        subscriptionPlanDescription,
    }: {
        id: number | null;
        userId: number;
        planId: number;
        subscriptionToken: string;
        cancelAtPeriodEnd: boolean;
        status: ValueOf<typeof SubscriptionStatus>;
        expirationDate: Date;
        subscriptionPlanName: string | null;
        subscriptionPlanPrice: number | null;
        subscriptionPlanDescription: string | null;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id,
            userId,
            planId,
            subscriptionToken,
            status,
            cancelAtPeriodEnd,
            expirationDate,
            subscriptionPlanName,
            subscriptionPlanPrice,
            subscriptionPlanDescription,
        });
    }

    public static initializeNew({
        userId,
        planId,
        subscriptionToken,
        cancelAtPeriodEnd,
        status,
        expirationDate,
    }: {
        userId: number;
        planId: number;
        subscriptionToken: string;
        cancelAtPeriodEnd: boolean;
        status: ValueOf<typeof SubscriptionStatus>;
        expirationDate: Date;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id: null,
            userId,
            planId,
            subscriptionToken,
            status,
            cancelAtPeriodEnd,
            expirationDate,
            subscriptionPlanName: null,
            subscriptionPlanPrice: null,
            subscriptionPlanDescription: null,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        planId: number;
        status: ValueOf<typeof SubscriptionStatus>;
        cancelAtPeriodEnd: boolean;
        subscriptionToken: string;
        expirationDate: Date;
        subscriptionPlanName: string | null;
        subscriptionPlanPrice: number | null;
        subscriptionPlanDescription: string | null;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            planId: this.planId,
            subscriptionToken: this.subscriptionToken,
            status: this.status,
            cancelAtPeriodEnd: this.cancelAtPeriodEnd as boolean,
            expirationDate: this.expirationDate,
            subscriptionPlanName: this.subscriptionPlanName,
            subscriptionPlanPrice: this.subscriptionPlanPrice as number,
            subscriptionPlanDescription: this.subscriptionPlanDescription,
        };
    }

    public toNewObject(): {
        userId: number;
        planId: number;
        status: ValueOf<typeof SubscriptionStatus>;
        cancelAtPeriodEnd: boolean;
        subscriptionToken: string;
        expirationDate: Date;
    } {
        return {
            userId: this.userId,
            planId: this.planId,
            status: this.status,
            cancelAtPeriodEnd: this.cancelAtPeriodEnd,
            subscriptionToken: this.subscriptionToken,
            expirationDate: this.expirationDate,
        };
    }
}

export { SubscriptionEntity };
