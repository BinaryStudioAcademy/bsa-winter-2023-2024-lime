import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { cryptService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
    type UserGetAllResponseDto,
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

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email,
                passwordHash: hash,
            }),
        );

        return user.toObject() as UserAuthResponseDto;
    }

    public async update(
        userId: number,
        userRequest: UserUpdateProfileRequestDto,
    ): Promise<UserAuthResponseDto | null> {
        try {
            const existingUser = await this.userRepository.find({
                id: userId,
            });

            if (existingUser) {
                const updatedUserDetails: Partial<UserDetailsModel> = {
                    fullName: userRequest.fullName,
                    avatarUrl: userRequest.avatarUrl,
                    username: userRequest.username,
                    dateOfBirth: userRequest.dateOfBirth,
                    weight: Number(userRequest.weight),
                    height: Number(userRequest.height),
                    gender: userRequest.gender,
                };

                const updatedUser = await this.userRepository.update(
                    userId,
                    updatedUserDetails,
                );

                if (!updatedUser) {
                    throw new Error('User not found');
                }

                return updatedUser.toObject() as UserAuthResponseDto;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            throw new Error(`Error occured ${error}`);
        }
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
