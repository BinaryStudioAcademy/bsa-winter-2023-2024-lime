import { type ValueOf } from '~/bundles/common/types/types.js';

import { UserBonusActionStatus } from './enums.js';

const UserBonusTransactionMessage: Record<
    ValueOf<typeof UserBonusActionStatus>,
    string
> = {
    [UserBonusActionStatus.REGISTERED]: 'Registration bonus',
    [UserBonusActionStatus.INVITED]: 'Friend invitation bonus',
} as const;

export { UserBonusTransactionMessage };
