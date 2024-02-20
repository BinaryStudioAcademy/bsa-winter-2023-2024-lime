import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type Gender } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class UserDetailsModel extends AbstractModel {
    public 'userId': number;

    public 'fullName': string | null;

    public 'avatarUrl': string | null;

    public 'username': string | null;

    public 'dateOfBirth': string | null;

    public 'weight': number | null;

    public 'height': number | null;

    public 'gender': ValueOf<typeof Gender> | null;

    public 'customerToken': string | null;

    public static override get tableName(): string {
        return DatabaseTableName.USER_DETAILS;
    }
}

export { UserDetailsModel };
