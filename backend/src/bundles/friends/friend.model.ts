import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import { FriendAttributes } from '~/bundles/friends/enums/enums.js';
import { UserDetailsAttributes } from '~/bundles/users/enums/user-details-attributes.enum.js';
import { UserDetailsModel } from '~/bundles/users/user-details.model.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class FriendModel extends AbstractModel {
    public 'userId': number;
    public 'followingId': number;
    public 'email': string;
    public 'userDetails': UserDetailsModel;

    public static override get tableName(): string {
        return DatabaseTableName.FRIENDS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            userDetails: {
                relation: Model.HasOneRelation,
                modelClass: UserDetailsModel,
                join: {
                    from: `${DatabaseTableName.FRIENDS}.${FriendAttributes.FOLLOWING_ID}`,
                    to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsAttributes.USER_ID}`,
                },
            },
        };
    }
}

export { FriendModel };
