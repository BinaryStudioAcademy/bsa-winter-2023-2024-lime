type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(payload: unknown): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(query: Record<string, T>): Promise<boolean>;
};

export { type Service };
