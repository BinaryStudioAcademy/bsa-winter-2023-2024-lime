import { type RelationMappings, Model } from 'objection';

import {
    OAuthInfoAttributes,
    OAuthModel,
    OAuthStateAttributes,
    OAuthStateModel,
} from '~/bundles/oauth/oauth.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserAchievementModel } from '../achievements/user-achievement.model.js';
import { UserReferralAttributes } from '../user-referrals/enums/user-referral.js';
import { UserReferralModel } from '../user-referrals/user-referral.model.js';
import { UserAttributes, UserDetailsAttributes } from './enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string;

    public 'userDetails': UserDetailsModel;

    public 'userOAuthInfo': OAuthModel;

    public 'userOAuthState': OAuthStateModel;

    public 'userReferral': UserReferralModel;

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            userDetails: {
                relation: Model.HasOneRelation,
                modelClass: UserDetailsModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsAttributes.USER_ID}`,
                },
            },
            oAuthInfo: {
                relation: Model.HasManyRelation,
                modelClass: OAuthModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.OAUTH_INFO}.${OAuthInfoAttributes.ID}`,
                },
            },
            oAuthState: {
                relation: Model.HasManyRelation,
                modelClass: OAuthStateModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.OAUTH_STATE}.${OAuthStateAttributes.ID}`,
                },
            },
            userReferral: {
                relation: Model.HasOneRelation,
                modelClass: UserReferralModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.USER_REFERRAL}.${UserReferralAttributes.USER_ID}`,
                },
            },
            userAchievement: {
                relation: Model.HasOneRelation,
                modelClass: UserAchievementModel,
                join: {
                    from: `${DatabaseTableName.USERS}.id`,
                    to: `${DatabaseTableName.USER_ACHIEVEMENTS}.userId`,
                },
            },
        };
    }
}

export { UserModel };
