import { type Entity } from '~/common/types/types.js';

class SubscriptionPlanEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'price': number;

    private 'description': string | null;

    private 'stripeProductId': string;

    private 'stripePriceId': string;

    private constructor({
        id,
        name,
        price,
        description,
        stripeProductId,
        stripePriceId,
    }: {
        id: number | null;
        name: string;
        price: number;
        description: string | null;
        stripeProductId: string;
        stripePriceId: string;
    }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.stripeProductId = stripeProductId;
        this.stripePriceId = stripePriceId;
    }

    public static initialize({
        id,
        name,
        price,
        description,
        stripeProductId,
        stripePriceId,
    }: {
        id: number | null;
        name: string;
        price: number;
        description: string | null;
        stripeProductId: string;
        stripePriceId: string;
    }): SubscriptionPlanEntity {
        return new SubscriptionPlanEntity({
            id,
            name,
            price,
            description,
            stripeProductId,
            stripePriceId,
        });
    }

    public static initializeNew({
        name,
        price,
        stripeProductId,
        stripePriceId,
    }: {
        name: string;
        price: number;
        stripeProductId: string;
        stripePriceId: string;
    }): SubscriptionPlanEntity {
        return new SubscriptionPlanEntity({
            id: null,
            name,
            price,
            description: null,
            stripeProductId,
            stripePriceId,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        price: number;
        description: string;
        stripeProductId: string;
        stripePriceId: string;
    } {
        return {
            id: this.id as number,
            name: this.name,
            price: this.price,
            description: this.description as string,
            stripeProductId: this.stripeProductId,
            stripePriceId: this.stripePriceId,
        };
    }

    public toNewObject(): {
        name: string;
        price: number;
        description: string;
        stripeProductId: string;
        stripePriceId: string;
    } {
        return {
            name: this.name,
            price: this.price,
            description: this.description as string,
            stripeProductId: this.stripeProductId,
            stripePriceId: this.stripePriceId,
        };
    }
}

export { SubscriptionPlanEntity };
