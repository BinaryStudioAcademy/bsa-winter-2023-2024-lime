type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(query: Record<string, T>, payload: unknown): Promise<T | null>;
    delete(): Promise<boolean>;
};

export { type Service };
