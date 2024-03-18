import {
    type Modifiers,
    type QueryBuilder,
    type RelationMappings,
    Model,
} from 'objection';

import { UserAchievementModel } from '~/bundles/achievements/achievements.js';
import {
    ChatAttributes,
    ChatModel,
    ChatUserAttributes,
} from '~/bundles/chats/chats.js';
import {
    OAuthInfoAttributes,
    OAuthModel,
    OAuthStateAttributes,
    OAuthStateModel,
} from '~/bundles/oauth/oauth.js';
import {
    SubscriptionAttributes,
    SubscriptionModel,
} from '~/bundles/subscriptions/subscriptions.js';
import {
    UserBonusAttributes,
    UserBonusModel,
} from '~/bundles/user-bonuses/user-bonuses.js';
import {
    WorkoutAttributes,
    WorkoutModel,
} from '~/bundles/workouts/workouts.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserAttributes, UserDetailsAttributes } from './enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';

const USER_DETAILS_RELATION = 'userDetails';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string | null;

    public 'stripeCustomerId': string;

    public 'userDetails': UserDetailsModel;

    public 'workouts': WorkoutModel;

    public 'userAchievements': UserAchievementModel;

    public 'userOAuthInfo': OAuthModel;

    public 'userOAuthState': OAuthStateModel;

    public 'userBonus': UserBonusModel;

    public 'chats': ChatModel[];

    public 'aiChat': ChatModel;

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
            userBonus: {
                relation: Model.HasManyRelation,
                modelClass: UserBonusModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.USER_BONUSES}.${UserBonusAttributes.USER_ID}`,
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
            chats: {
                relation: Model.ManyToManyRelation,
                modelClass: ChatModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    through: {
                        from: `${DatabaseTableName.CHATS_USERS}.${ChatUserAttributes.USER_ID}`,
                        to: `${DatabaseTableName.CHATS_USERS}.${ChatUserAttributes.CHAT_ID}`,
                    },
                    to: `${DatabaseTableName.CHATS}.${ChatAttributes.ID}`,
                },
            },
            aiChat: {
                relation: Model.HasOneThroughRelation,
                modelClass: ChatModel,
                filter: (builder: QueryBuilder<ChatModel>): void => {
                    void builder.findOne(ChatAttributes.IS_ASSISTANT, true);
                },
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    through: {
                        from: `${DatabaseTableName.CHATS_USERS}.${ChatUserAttributes.USER_ID}`,
                        to: `${DatabaseTableName.CHATS_USERS}.${ChatUserAttributes.CHAT_ID}`,
                    },
                    to: `${DatabaseTableName.CHATS}.${ChatAttributes.ID}`,
                },
            },
        };
    }

    public static override get modifiers(): Modifiers<QueryBuilder<UserModel>> {
        return {
            userDetails(builder): QueryBuilder<UserModel> {
                return builder
                    .select(
                        `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                        `${DatabaseTableName.USERS}.${UserAttributes.EMAIL}`,
                        `${USER_DETAILS_RELATION}.${UserDetailsAttributes.FULL_NAME}`,
                        `${USER_DETAILS_RELATION}.${UserDetailsAttributes.AVATAR_URL}`,
                    )
                    .leftJoinRelated(USER_DETAILS_RELATION);
            },
        };
    }
}

export { UserModel };
