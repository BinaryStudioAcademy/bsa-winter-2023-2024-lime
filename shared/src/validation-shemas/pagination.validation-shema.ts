import { z } from 'zod';

import { PaginationValidationMessage } from '../index.js';

type PaginationValidationDto = {
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
};

const pagination = z
    .object<PaginationValidationDto>({
        page: z.string().optional(),
        limit: z.string().optional(),
    })
    .refine((data) => (data.page ? !Number.isNaN(Number(data.page)) : true), {
        message: PaginationValidationMessage.PAGE_NUMBER,
    })
    .refine((data) => (data.page ? Number(data.page) >= 1 : true), {
        message: PaginationValidationMessage.PAGE_MIN_NUMBER,
    })
    .refine((data) => (data.limit ? !Number.isNaN(Number(data.limit)) : true), {
        message: PaginationValidationMessage.LIMIT_NUMBER,
    })
    .refine((data) => (data.limit ? Number(data.limit) >= 1 : true), {
        message: PaginationValidationMessage.LIMIT_MIN_NUMBER,
    });

export { pagination };
