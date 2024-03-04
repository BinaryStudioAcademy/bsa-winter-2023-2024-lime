const HttpCode = {
    OK: 200,
    CREATED: 201,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSED_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export { HttpCode };
