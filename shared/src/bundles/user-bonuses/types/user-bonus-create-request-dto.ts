import { type ValueOf } from '../../../types/types.js';
import { type UserBonusActionStatus } from '../enums/enums.js';

type UserBonusCreateRequestDto = {
    userId: number;
    actionType: ValueOf<typeof UserBonusActionStatus>;
    amount: number;
};

export { type UserBonusCreateRequestDto };
