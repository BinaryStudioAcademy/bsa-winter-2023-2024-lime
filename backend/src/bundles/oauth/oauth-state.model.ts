import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class OAuthStateModel extends AbstractModel {
    public 'userId': number;

    public 'uuid': string;

    public static override get tableName(): string {
        return DatabaseTableName.OAUTH_STATE;
    }
}

export { OAuthStateModel };
