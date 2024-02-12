const ContentType = {
    JSON: 'application/json',
} as const;

type ContentType = typeof ContentType;
export { ContentType };
