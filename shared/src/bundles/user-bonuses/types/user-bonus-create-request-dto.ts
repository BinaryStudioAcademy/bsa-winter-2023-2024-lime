import { type ValueOf } from '../../../types/types.js';
import {
    type UserBonusActionType,
    type UserBonusTransactionType,
} from '../enums/enums.js';

type UserBonusCreateRequestDto = {
    userId: number;
    actionType: ValueOf<typeof UserBonusActionType>;
    transactionType: ValueOf<typeof UserBonusTransactionType>;
    amount: number;
};

export { type UserBonusCreateRequestDto };
