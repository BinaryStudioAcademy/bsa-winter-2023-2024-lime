import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserMessageModel extends AbstractModel {
    public 'userId': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_MESSAGE;
    }
}

export { UserMessageModel };
