import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class SubscriptionModel extends AbstractModel {
    public 'userId': number;

    public 'planId': number;

    public static override get tableName(): string {
        return DatabaseTableName.SUBSCRIPTIONS;
    }
}

export { SubscriptionModel };
