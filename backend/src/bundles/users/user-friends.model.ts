import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserFriendsModel extends AbstractModel {
    public 'userId': number;
    public 'friendId': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_FRIENDS;
    }
}

export { UserFriendsModel };
