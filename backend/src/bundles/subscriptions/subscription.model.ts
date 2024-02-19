import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class SubscriptionsModel extends AbstractModel {
    public 'name': string;

    public 'description': string;

    public 'productToken': string;

    public 'priceToken': string;

    public static override get tableName(): string {
        return DatabaseTableName.SUBSCRIPTIONS;
    }
}

export { SubscriptionsModel };
