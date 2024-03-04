import { type ValueOf } from '~/common/types/types.js';

import { Action } from './actions.enum.js';

const BonusAmount: Record<ValueOf<typeof Action>, number> = {
    [Action.REGISTERED]: 50,
    [Action.INVITED]: 20,
} as const;

export { BonusAmount };
