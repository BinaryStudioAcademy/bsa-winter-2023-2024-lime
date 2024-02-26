type Repository<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(id: number, changes: unknown): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Repository };
