import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserDetailsModel extends AbstractModel {
    public 'userId': number;

    public 'fullName': string;

    public static override get tableName(): string {
        return DatabaseTableName.USER_DETAILS;
    }
}

export { UserDetailsModel };
