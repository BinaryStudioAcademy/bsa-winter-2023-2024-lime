import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class OAuthStateModel extends AbstractModel {
    public 'userId': number | null;

    public 'uuid': string;

    public 'referralCode': string | null;

    public static override get tableName(): string {
        return DatabaseTableName.OAUTH_STATE;
    }
}

export { OAuthStateModel };
