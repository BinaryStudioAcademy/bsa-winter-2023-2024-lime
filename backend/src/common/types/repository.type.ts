type Repository<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(query: Record<string, T>): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(query: Record<string, unknown>, payload: unknown): Promise<T>;
    delete(payload: unknown): Promise<boolean>;
};

export { type Repository };
