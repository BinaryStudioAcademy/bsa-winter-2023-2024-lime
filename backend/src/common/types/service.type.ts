
import { type UserModel } from '~/bundles/users/user.model';

type Service<T = unknown> = {
    find(): Promise<T>;
    findByEmail(email: string): Promise<UserModel | null>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };
