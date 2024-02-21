import { type UserUpdateProfileRequestDto } from 'shared';

type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(
        id: number,
        updatedDetails: UserUpdateProfileRequestDto,
    ): Promise<T | null>;
    delete(): Promise<boolean>;
};

export { type Service };
