import { type RelationMappings, Model } from 'objection';

import {
    OAuthInfoAttributes,
    OAuthModel,
    OAuthStateAttributes,
    OAuthStateModel,
} from '~/bundles/oauth/oauth.js';
import { ScheduleAttributes } from '~/bundles/schedules/enums/enums.js';
import { ScheduleModel } from '~/bundles/schedules/schedules.js';
import { WorkoutAttributes } from '~/bundles/workouts/enums/enums.js';
import { WorkoutModel } from '~/bundles/workouts/workouts.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserAchievementModel } from '../achievements/user-achievement.model.js';
import { SubscriptionModel } from '../subscriptions/subscription.model.js';
import { SubscriptionAttributes } from '../subscriptions/subscriptions.js';
import { UserAttributes, UserDetailsAttributes } from './enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string;

    public 'stripeCustomerId': string;

    public 'userDetails': UserDetailsModel;
    public 'workouts': WorkoutModel;

    public 'userAchievements': UserAchievementModel;

    public 'userOAuthInfo': OAuthModel;

    public 'userOAuthState': OAuthStateModel;

    public 'schedules': ScheduleModel;

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
            subscription: {
                relation: Model.HasManyRelation,
                modelClass: SubscriptionModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTIONS}.${SubscriptionAttributes.USER_ID}`,
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
            userAchievements: {
                relation: Model.HasOneRelation,
                modelClass: UserAchievementModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.USER_ACHIEVEMENTS}.${UserDetailsAttributes.USER_ID}`,
                },
            },
            workouts: {
                relation: Model.HasManyRelation,
                modelClass: WorkoutModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.WORKOUTS}.${WorkoutAttributes.USER_ID}`,
                },
            },
            schedules: {
                relation: Model.HasManyRelation,
                modelClass: ScheduleModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.SCHEDULES}.${ScheduleAttributes.USER_ID}`,
                },
            },
        };
    }
}

export { UserModel };
