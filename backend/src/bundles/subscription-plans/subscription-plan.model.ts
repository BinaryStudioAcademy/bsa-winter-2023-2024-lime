import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class SubscriptionPlanModel extends AbstractModel {
    public 'name': string;

    public 'price': number;

    public 'description': string;

    public 'productToken': string;

    public 'priceToken': string;

    public static override get tableName(): string {
        return DatabaseTableName.SUBSCRIPTIONS;
    }
}

export { SubscriptionPlanModel };
