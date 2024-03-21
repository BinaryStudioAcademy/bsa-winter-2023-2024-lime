import { type ValueOf } from '~/common/types/types.js';

import { UserBonusActionType } from './enums.js';

const BonusAmount: Record<ValueOf<typeof UserBonusActionType>, number> = {
    [UserBonusActionType.REGISTERED]: 50,
    [UserBonusActionType.INVITED]: 20,
    [UserBonusActionType.SUBSCRIBE]: 0,
} as const;

export { BonusAmount };
