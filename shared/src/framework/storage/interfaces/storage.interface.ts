interface IStorage {
    set(key: string, value: unknown): Promise<void>;
    get<R>(key: string): Promise<R | null>;
    drop(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
}

export { type IStorage };
