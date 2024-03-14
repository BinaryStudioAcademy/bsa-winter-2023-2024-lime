import crypto from 'node:crypto';

import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type File } from '~/common/services/file/types/types.js';
import {
    cryptService,
    fileService,
    stripeService,
} from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import {
    type UserBonusCreateRequestDto,
    type UserBonusGetAllItemResponseDto,
    UserBonusEntity,
    UserBonusTransactionType,
} from '../user-bonuses/user-bonuses.js';
import { UserValidationMessage } from './enums/enums.js';
import {
    type UserAuthResponseDto,
    type UserAuthSignInRequestDto,
    type UserGetAllResponseDto,
    type UserUpdateProfileRequestDto,
    type UserUploadAvatarResponseDto,
} from './types/types.js';
import { type UserDetailsModel } from './user-details.model.js';

class UserService implements Service {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<UserEntity | null> {
        return await this.userRepository.find(query);
    }

    public async findWithUserDetailsJoined(
        query: Record<string, unknown>,
    ): Promise<UserEntity | null> {
        return await this.userRepository.findWithUserDetailsJoined(query);
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: UserAuthSignInRequestDto,
    ): Promise<UserAuthResponseDto> {
        const { email, password } = payload;
        const { hash } = cryptService.encryptSync(password);
        const { stripeCustomerId } = await stripeService.createCustomer(email);
        const generatedReferralCode = crypto.randomUUID();

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email,
                passwordHash: hash,
                stripeCustomerId,
                referralCode: generatedReferralCode,
            }),
        );

        return user.toObject() as UserAuthResponseDto;
    }

    public async updateUserProfile(
        userId: number,
        payload: UserUpdateProfileRequestDto,
    ): Promise<UserAuthResponseDto | null> {
        try {
            const updatedUser = await this.userRepository.updateUserDetails(
                userId,
                payload as Partial<UserDetailsModel>,
            );
            if (!updatedUser) {
                throw new HttpError({
                    message: UserValidationMessage.USER_NOT_FOUND,
                    status: HttpCode.NOT_FOUND,
                });
            }
            return updatedUser.toObject() as UserAuthResponseDto;
        } catch (error) {
            throw new Error(`Error occurred ${error}`);
        }
    }

    public async createUserBonusTransaction(
        payload: UserBonusCreateRequestDto,
    ): Promise<UserBonusGetAllItemResponseDto> {
        const { userId, actionType, transactionType, amount } = payload;

        const userToUpdate = await this.userRepository.find({ id: userId });
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
                message: UserValidationMessage.BONUS_OPERATION_LACK_OF_FUNDS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const userBonus = await this.userRepository.createUserBonusTransaction(
            UserBonusEntity.initializeNew({
                userId,
                actionType,
                transactionType,
                amount,
            }),
        );

        const updatedUser = await this.userRepository.updateUserDetails(
            userId,
            { bonusBalance: updatedBalance },
        );

        if (!userBonus || !updatedUser) {
            throw new HttpError({
                message: UserValidationMessage.BONUS_OPERATION_NOT_SUCCESSFUL,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return userBonus;
    }

    public async uploadAvatar(
        payload: File,
    ): Promise<UserUploadAvatarResponseDto> {
        try {
            const { Location } = await fileService.uploadFile(payload);
            return {
                avatarUrl: Location,
            };
        } catch (error) {
            throw new Error(`Error occurred ${error}`);
        }
    }

    public async update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): ReturnType<Service['update']> {
        return await this.userRepository.update(query, payload);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
