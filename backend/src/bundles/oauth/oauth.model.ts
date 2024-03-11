import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type OAuthProvider, type OAuthType } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class OAuthModel extends AbstractModel {
    public 'userId': number;

    public 'ownerId': number;

    public 'tokenType': string;

    public 'expiresAt': number;

    public 'accessToken': string;

    public 'refreshToken': string;

    public 'scope': string;

    public 'provider': ValueOf<typeof OAuthProvider>;

    public 'type': ValueOf<typeof OAuthType>;

    public static override get tableName(): string {
        return DatabaseTableName.OAUTH_INFO;
    }
}

export { OAuthModel };
