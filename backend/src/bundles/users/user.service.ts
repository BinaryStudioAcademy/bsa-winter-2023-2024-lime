import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { cryptService, stripeService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import { UserValidationMessage } from './enums/enums.js';
import {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
    type UserGetAllResponseDto,
    type UserOAuthRequestDto,
    type UserUpdateProfileRequestDto,
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

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: UserAuthRequestDto,
    ): Promise<UserAuthResponseDto> {
        const { email, password } = payload;
        const { hash } = cryptService.encryptSync(password);
        const { stripeCustomerId } = await stripeService.createCustomer(email);

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email,
                passwordHash: hash,
                stripeCustomerId,
            }),
        );

        return user.toObject() as UserAuthResponseDto;
    }

    public async findOrCreateOAuthUser(
        payload: UserOAuthRequestDto,
    ): Promise<UserAuthResponseDto> {
        const { email, fullName, avatarUrl } = payload;

        const userByEmail = await this.userRepository.find({
            email,
        });

        if (userByEmail) {
            const user = userByEmail.toObject();
            const updatedUser = (await this.userRepository.updateUserProfile(
                user.id,
                {
                    fullName,
                    avatarUrl,
                },
            )) as UserEntity;
            return updatedUser.toObject() as UserAuthResponseDto;
        }

        const { stripeCustomerId } = await stripeService.createCustomer(email);
        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email,
                stripeCustomerId,
                fullName,
                avatarUrl,
            }),
        );

        return user.toObject() as UserAuthResponseDto;
    }

    public async updateUserProfile(
        userId: number,
        payload: UserUpdateProfileRequestDto,
    ): Promise<UserAuthResponseDto | null> {
        try {
            const updatedUser = await this.userRepository.updateUserProfile(
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
            throw new Error(`Error occured ${error}`);
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
