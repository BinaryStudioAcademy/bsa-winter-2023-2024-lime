type Repository<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(payload: unknown): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(payload: unknown, id: number): Promise<T>;
    delete(payload: unknown): Promise<boolean>;
};

export { type Repository };
