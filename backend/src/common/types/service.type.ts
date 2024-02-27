type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    updatePassword(id: number, changes: unknown): Promise<T>;
    update(query: Record<string, T>, payload: unknown): Promise<T | null>;
    updatePassword(id: number, changes: unknown): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };
