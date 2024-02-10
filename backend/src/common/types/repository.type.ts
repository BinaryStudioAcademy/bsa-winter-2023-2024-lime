import { type UserSignUpResponseDto } from 'shared/build';

type Repository<T = unknown> = {
    find(): Promise<T>;
    findByEmail(email: string): Promise<UserSignUpResponseDto | null>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Repository };
