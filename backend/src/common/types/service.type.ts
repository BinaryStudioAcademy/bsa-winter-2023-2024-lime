type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(query: Record<string, T>): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: number, changes: unknown): Promise<T>;
    delete(id: number): Promise<boolean>;
};

export { type Service };
