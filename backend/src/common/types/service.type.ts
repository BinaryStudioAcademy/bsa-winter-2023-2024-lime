import { type UserSignUpResponseDto } from 'shared/build';

type Service<T = unknown> = {
    find(): Promise<T>;
    findByEmail(email: string): Promise<UserSignUpResponseDto | null>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };
