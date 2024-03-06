import { type ValueOf } from '~/common/types/types.js';

import { UserBonusActionStatus } from './enums.js';

const BonusAmount: Record<ValueOf<typeof UserBonusActionStatus>, number> = {
    [UserBonusActionStatus.REGISTERED]: 50,
    [UserBonusActionStatus.INVITED]: 20,
} as const;

export { BonusAmount };
