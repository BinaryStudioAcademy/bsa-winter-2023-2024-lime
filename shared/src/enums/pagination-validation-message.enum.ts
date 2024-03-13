const PaginationValidationMessage = {
    PAGE_NUMBER: 'Page must be a valid number',
    PAGE_MIN_NUMBER: 'Page can`t be less than 1',
    LIMIT_NUMBER: 'Limit must be a valid number',
    LIMIT_MIN_NUMBER: 'Limit can`t be less than 1',
} as const;

export { PaginationValidationMessage };
