type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(query: Record<string, T>): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(query: Record<string, T>, payload: unknown): Promise<T>;
    delete(query: Record<string, T>): Promise<boolean>;
};

export { type Service };
