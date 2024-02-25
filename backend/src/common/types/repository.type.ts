type Repository<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(id: number, payload: unknown): Promise<T>;
    delete(id: number): Promise<boolean>;
};

export { type Repository };
