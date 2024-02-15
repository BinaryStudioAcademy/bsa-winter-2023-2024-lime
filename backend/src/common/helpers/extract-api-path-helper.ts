const extractApiPath = (url: string): string | null => {
    const regex = /\/api\/v1(\/\w+)/;
    return url.match(regex)?.[1] ?? null;
};

export { extractApiPath };
