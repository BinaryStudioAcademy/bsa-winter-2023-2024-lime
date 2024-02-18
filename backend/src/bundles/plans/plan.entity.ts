import { type Entity } from '~/common/types/types.js';

class PlanEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'description': string | null;

    private 'productToken': string;

    private 'priceToken': string;

    private constructor({
        id,
        name,
        description,
        productToken,
        priceToken,
    }: {
        id: number | null;
        name: string;
        description: string | null;
        productToken: string;
        priceToken: string;
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.productToken = productToken;
        this.priceToken = priceToken;
    }

    public static initialize({
        id,
        name,
        description,
        productToken,
        priceToken,
    }: {
        id: number | null;
        name: string;
        description: string | null;
        productToken: string;
        priceToken: string;
    }): PlanEntity {
        return new PlanEntity({
            id,
            name,
            description,
            productToken,
            priceToken,
        });
    }

    public static initializeNew({
        name,
        productToken,
        priceToken,
    }: {
        name: string;
        productToken: string;
        priceToken: string;
    }): PlanEntity {
        return new PlanEntity({
            id: null,
            name,
            description: null,
            productToken,
            priceToken,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        description: string;
        productToken: string;
        priceToken: string;
    } {
        return {
            id: this.id as number,
            name: this.name,
            description: this.description as string,
            productToken: this.productToken,
            priceToken: this.priceToken,
        };
    }

    public toNewObject(): {
        name: string;
        description: string;
        productToken: string;
        priceToken: string;
    } {
        return {
            name: this.name,
            description: this.description as string,
            productToken: this.productToken,
            priceToken: this.priceToken,
        };
    }
}

export { PlanEntity };
