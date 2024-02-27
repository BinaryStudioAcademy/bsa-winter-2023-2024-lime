import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type SubscriptionStatus } from './enums/enums.js';

class SubscriptionEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'planId': number;

    private 'stripeSubscriptionId': string;

    private 'status': ValueOf<typeof SubscriptionStatus>;

    private 'isCanceled': boolean;

    private 'expiresAt': Date;

    private 'subscriptionPlanName': string | null;

    private 'subscriptionPlanPrice': number | null;

    private 'subscriptionPlanDescription': string | null;

    private constructor({
        id,
        userId,
        planId,
        stripeSubscriptionId,
        status,
        isCanceled,
        expiresAt,
        subscriptionPlanName,
        subscriptionPlanPrice,
        subscriptionPlanDescription,
    }: {
        id: number | null;
        userId: number;
        planId: number;
        stripeSubscriptionId: string;
        status: ValueOf<typeof SubscriptionStatus>;
        isCanceled: boolean;
        expiresAt: Date;
        subscriptionPlanName: string | null;
        subscriptionPlanPrice: number | null;
        subscriptionPlanDescription: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
        this.status = status;
        this.isCanceled = isCanceled;
        this.expiresAt = expiresAt;
        this.stripeSubscriptionId = stripeSubscriptionId;
        this.subscriptionPlanName = subscriptionPlanName;
        this.subscriptionPlanPrice = subscriptionPlanPrice;
        this.subscriptionPlanDescription = subscriptionPlanDescription;
    }

    public static initialize({
        id,
        userId,
        planId,
        stripeSubscriptionId,
        status,
        isCanceled,
        expiresAt,
        subscriptionPlanName,
        subscriptionPlanPrice,
        subscriptionPlanDescription,
    }: {
        id: number | null;
        userId: number;
        planId: number;
        stripeSubscriptionId: string;
        status: ValueOf<typeof SubscriptionStatus>;
        isCanceled: boolean;
        expiresAt: Date;
        subscriptionPlanName: string | null;
        subscriptionPlanPrice: number | null;
        subscriptionPlanDescription: string | null;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id,
            userId,
            planId,
            stripeSubscriptionId,
            status,
            isCanceled,
            expiresAt,
            subscriptionPlanName,
            subscriptionPlanPrice,
            subscriptionPlanDescription,
        });
    }

    public static initializeNew({
        userId,
        planId,
        stripeSubscriptionId,
        status,
        isCanceled,
        expiresAt,
    }: {
        userId: number;
        planId: number;
        stripeSubscriptionId: string;
        status: ValueOf<typeof SubscriptionStatus>;
        isCanceled: boolean;
        expiresAt: Date;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id: null,
            userId,
            planId,
            stripeSubscriptionId,
            status,
            isCanceled,
            expiresAt,
            subscriptionPlanName: null,
            subscriptionPlanPrice: null,
            subscriptionPlanDescription: null,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        planId: number;
        stripeSubscriptionId: string;
        status: ValueOf<typeof SubscriptionStatus>;
        isCanceled: boolean;
        expiresAt: Date;
        subscriptionPlanName: string | null;
        subscriptionPlanPrice: number | null;
        subscriptionPlanDescription: string | null;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            planId: this.planId,
            stripeSubscriptionId: this.stripeSubscriptionId,
            status: this.status,
            isCanceled: this.isCanceled as boolean,
            expiresAt: this.expiresAt,
            subscriptionPlanName: this.subscriptionPlanName,
            subscriptionPlanPrice: this.subscriptionPlanPrice as number,
            subscriptionPlanDescription: this.subscriptionPlanDescription,
        };
    }

    public toNewObject(): {
        userId: number;
        planId: number;
        stripeSubscriptionId: string;
        status: ValueOf<typeof SubscriptionStatus>;
        isCanceled: boolean;
        expiresAt: Date;
    } {
        return {
            userId: this.userId,
            planId: this.planId,
            status: this.status,
            isCanceled: this.isCanceled,
            stripeSubscriptionId: this.stripeSubscriptionId,
            expiresAt: this.expiresAt,
        };
    }
}

export { SubscriptionEntity };
