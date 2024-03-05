import { type ValueOf } from '~/common/types/types.js';

import { ActionType } from './actions.enum.js';

const BonusAmount: Record<ValueOf<typeof ActionType>, number> = {
    [ActionType.REGISTERED]: 50,
    [ActionType.INVITED]: 20,
} as const;

export { BonusAmount };
