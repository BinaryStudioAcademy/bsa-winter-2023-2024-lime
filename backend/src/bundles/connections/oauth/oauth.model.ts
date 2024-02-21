import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type Providers } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class OAuthModel extends AbstractModel {
    public 'userId': number;

    public 'tokenType': string;

    public 'expiresIn': number;

    public 'expiresAt': number;

    public 'accessToken': string;

    public 'refreshToken': string;

    public 'scope': string;

    public 'provider': ValueOf<typeof Providers>;

    public static override get tableName(): string {
        return DatabaseTableName.OAUTH_INFO;
    }
}

export { OAuthModel };
