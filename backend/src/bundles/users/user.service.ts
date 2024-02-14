import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { cryptService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
    type UserGetAllResponseDto,
} from './types/types.js';

class UserService implements Service {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): ReturnType<Service['find']> {
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
    ): Promise<Omit<UserAuthResponseDto, 'token'>> {
        const { hash, salt } = cryptService.encryptSync(payload.password);
        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email: payload.email,
                passwordSalt: salt, // TODO
                passwordHash: hash, // TODO
            }),
        );

        return user.toObject();
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
