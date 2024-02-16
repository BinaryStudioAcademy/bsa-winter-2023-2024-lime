import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type Gender } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class UserDetailsModel extends AbstractModel {
    public 'userId': number;

    public 'fullName': string;

    public 'avatarUrl': string;

    public 'username': string;

    public 'dateOfBirth': string;

    public 'weight': number;

    public 'height': number;

    public 'gender': ValueOf<typeof Gender>;

    public static override get tableName(): string {
        return DatabaseTableName.USER_DETAILS;
    }
}

export { UserDetailsModel };
