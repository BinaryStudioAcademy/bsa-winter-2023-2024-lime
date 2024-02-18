import { type Entity } from '~/common/types/types.js';

class SubscriptionEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'planId': number;

    private constructor({
        id,
        userId,
        planId,
    }: {
        id: number | null;
        userId: number;
        planId: number;
    }) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
    }

    public static initialize({
        id,
        userId,
        planId,
    }: {
        id: number | null;
        userId: number;
        planId: number;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id,
            userId,
            planId,
        });
    }

    public static initializeNew({
        userId,
        planId,
    }: {
        userId: number;
        planId: number;
    }): SubscriptionEntity {
        return new SubscriptionEntity({
            id: null,
            userId,
            planId,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        planId: number;
    } {
        return {
            id: this.id as number,
            userId: this.userId,
            planId: this.planId,
        };
    }

    public toNewObject(): {
        userId: number;
        planId: number;
    } {
        return {
            userId: this.userId,
            planId: this.planId,
        };
    }
}

export { SubscriptionEntity };
