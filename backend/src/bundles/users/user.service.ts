import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type IService } from '~/common/interfaces/interfaces.js';
import { cryptService } from '~/common/services/services.js';

import {
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';

class UserService implements IService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public find(): ReturnType<IService['find']> {
        return Promise.resolve(null);
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
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

    public update(): ReturnType<IService['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<IService['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
