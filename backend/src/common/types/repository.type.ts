type Repository<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Repository };
