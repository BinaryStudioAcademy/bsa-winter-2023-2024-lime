import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ValueOf } from '~/common/types/types.js';

import { type OAuthType } from './enums/enums.js';

class OAuthStateModel extends AbstractModel {
    public 'userId': number | null;

    public 'uuid': string;

    public 'type': ValueOf<typeof OAuthType>;

    public static override get tableName(): string {
        return DatabaseTableName.OAUTH_STATE;
    }
}

export { OAuthStateModel };
