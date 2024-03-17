type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(query: Record<string, T>): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<T | null>;
    delete(payload: unknown): Promise<boolean | number>;
};

export { type Service };
