type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: number, changes: unknown): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };
