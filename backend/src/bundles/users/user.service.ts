import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { cryptService, stripeService } from '~/common/services/services.js';
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

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }

    public async getOrCreateStripeCustomer({
        userId,
    }: {
        userId: number;
    }): Promise<string | null> {
        const user = await this.find({ id: userId });
        const userObject = user?.toObject();

        if (!user || !userObject || !userObject.email) {
            return null;
        }

        if (!user.customerToken) {
            const customerToken = await stripeService.createCustomer({
                email: userObject.email,
            });

            try {
                await this.userRepository.updateStripeCustomerToken(
                    userObject.id,
                    customerToken,
                );

                return customerToken;
            } catch (error) {
                await stripeService.deleteCustomer({ id: customerToken });
                return (error as Error).message;
            }
        }

        return user.customerToken;
    }
}

export { UserService };
