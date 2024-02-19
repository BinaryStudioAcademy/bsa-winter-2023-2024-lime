import { type Entity } from '~/common/types/types.js';

class SubscriptionPlanEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'price': number;

    private 'description': string | null;

    private 'productToken': string;

    private 'priceToken': string;

    private constructor({
        id,
        name,
        price,
        description,
        productToken,
        priceToken,
    }: {
        id: number | null;
        name: string;
        price: number;
        description: string | null;
        productToken: string;
        priceToken: string;
    }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.productToken = productToken;
        this.priceToken = priceToken;
    }

    public static initialize({
        id,
        name,
        price,
        description,
        productToken,
        priceToken,
    }: {
        id: number | null;
        name: string;
        price: number;
        description: string | null;
        productToken: string;
        priceToken: string;
    }): SubscriptionPlanEntity {
        return new SubscriptionPlanEntity({
            id,
            name,
            price,
            description,
            productToken,
            priceToken,
        });
    }

    public static initializeNew({
        name,
        price,
        productToken,
        priceToken,
    }: {
        name: string;
        price: number;
        productToken: string;
        priceToken: string;
    }): SubscriptionPlanEntity {
        return new SubscriptionPlanEntity({
            id: null,
            name,
            price,
            description: null,
            productToken,
            priceToken,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        price: number;
        description: string;
        productToken: string;
        priceToken: string;
    } {
        return {
            id: this.id as number,
            name: this.name,
            price: this.price,
            description: this.description as string,
            productToken: this.productToken,
            priceToken: this.priceToken,
        };
    }

    public toNewObject(): {
        name: string;
        price: number;
        description: string;
        productToken: string;
        priceToken: string;
    } {
        return {
            name: this.name,
            price: this.price,
            description: this.description as string,
            productToken: this.productToken,
            priceToken: this.priceToken,
        };
    }
}

export { SubscriptionPlanEntity };
