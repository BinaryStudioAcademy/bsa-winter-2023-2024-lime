type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<T>;
    delete(payload: unknown): Promise<boolean>;
};

export { type Service };
