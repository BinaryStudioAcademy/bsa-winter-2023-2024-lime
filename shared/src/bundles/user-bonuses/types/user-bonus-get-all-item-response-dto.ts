import { type ValueOf } from '../../../types/types.js';
import {
    type UserBonusActionType,
    type UserBonusTransactionType,
} from '../enums/enums.js';

type UserBonusGetAllItemResponseDto = {
    id: number;
    userId: number;
    actionType: ValueOf<typeof UserBonusActionType>;
    transactionType: ValueOf<typeof UserBonusTransactionType>;
    amount: number;
    createdAt: string | null;
};

export { type UserBonusGetAllItemResponseDto };
