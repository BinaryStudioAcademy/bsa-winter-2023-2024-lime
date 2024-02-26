type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(payload: unknown): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: number, changes: unknown): Promise<T>;
    delete(query: Record<string, T>): Promise<boolean>;
};

export { type Service };
