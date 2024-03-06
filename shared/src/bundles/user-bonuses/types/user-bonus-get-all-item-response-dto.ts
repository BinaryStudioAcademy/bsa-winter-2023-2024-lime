import { type ValueOf } from '../../../types/types.js';
import { type UserBonusActionStatus } from '../enums/enums.js';

type UserBonusGetAllItemResponseDto = {
    id: number;
    userId: number;
    actionType: ValueOf<typeof UserBonusActionStatus>;
    amount: number;
    createdAt: string | null;
};

export { type UserBonusGetAllItemResponseDto };
