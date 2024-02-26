type Repository<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<T>;
    delete(payload: unknown): Promise<boolean>;
};

export { type Repository };
