import { type UserModel } from '~/bundles/users/user.model.js';

type UserRepositoryType = {
    findByEmail(email: string): Promise<UserModel | undefined>;
};

export { type UserRepositoryType };
