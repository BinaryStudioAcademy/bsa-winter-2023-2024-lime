import { type UserModel } from '~/bundles/users/user.model.js';

type UserServiceType = {
    findByEmail(email: string): Promise<UserModel | undefined>;
};

export { type UserServiceType };
