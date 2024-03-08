import { UserValidationMessage } from '~/bundles/users/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { type UserRepository } from '../users/users.js';
import { UserBonusTransactionType } from './enums/enums.js';
import {
    type UserBonusCreateRequestDto,
    type UserBonusGetAllItemResponseDto,
    type UserBonusGetAllResponseDto,
} from './types/types.js';
import { UserBonusEntity } from './user-bonus.entity.js';
import { type UserBonusRepository } from './user-bonus.repository.js';

class UserBonusService {
    private userBonusRepository: UserBonusRepository;

    private userRespository: UserRepository;

    public constructor(
        userRespository: UserRepository,
        userBonusRepository: UserBonusRepository,
    ) {
        this.userRespository = userRespository;
        this.userBonusRepository = userBonusRepository;
    }

    public async findMany(
        query: Record<string, unknown>,
    ): Promise<UserBonusGetAllResponseDto> {
        const items = await this.userBonusRepository.findAllByQuery(query);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: UserBonusCreateRequestDto,
    ): Promise<UserBonusGetAllItemResponseDto> {
        const { userId, actionType, transactionType, amount } = payload;

        const userToUpdate = await this.userRespository.find({ id: userId });
        if (!userToUpdate) {
            throw new HttpError({
                message: UserValidationMessage.USER_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const { bonusBalance } = userToUpdate.toObject();
        const updatedBalance =
            transactionType === UserBonusTransactionType.EXSPENSE
                ? Number(bonusBalance) - amount
                : Number(bonusBalance) + amount;

        if (updatedBalance < 0) {
            throw new HttpError({
                message: 'Operation can not be finished due to lack of funds.',
                status: HttpCode.BAD_REQUEST,
            });
        }

        const userBonus = await this.userBonusRepository.create(
            UserBonusEntity.initializeNew({
                userId,
                actionType,
                transactionType,
                amount,
            }),
        );

        await this.userRespository.updateUserDetails(userId, {
            bonusBalance: updatedBalance,
        });

        return userBonus.toObject();
    }
}

export { UserBonusService };
