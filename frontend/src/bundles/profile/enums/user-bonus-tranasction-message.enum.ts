import { type ValueOf } from '~/bundles/common/types/types.js';

import { UserBonusActionType } from './enums.js';

const UserBonusTransactionMessage: Record<
    ValueOf<typeof UserBonusActionType>,
    string
> = {
    [UserBonusActionType.REGISTERED]: 'Registration bonus',
    [UserBonusActionType.INVITED]: 'Friend invitation bonus',
    [UserBonusActionType.SUBSCRIBE]: 'Subscription buy with bonus points',
} as const;

export { UserBonusTransactionMessage };
