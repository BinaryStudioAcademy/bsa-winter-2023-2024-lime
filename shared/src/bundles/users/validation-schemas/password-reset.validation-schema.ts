import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type PasswordResetRequestValidationDto = {
    id: z.ZodNumber;
    token: z.ZodString;
    password: z.ZodString;
};

const passwordReset = z.object<PasswordResetRequestValidationDto>({
    id: z.number(),
    token: z.string(),
    password: z
        .string()
        .trim()
        .min(1, {
            message: UserValidationMessage.REQUIRED,
        })
        .min(UserValidationRule.PASSWORD.MIN_LENGTH, {
            message: UserValidationMessage.INVALID_PASSWORD,
        })
        .max(UserValidationRule.PASSWORD.MAX_LENGTH, {
            message: UserValidationMessage.INVALID_PASSWORD,
        }),
});

export { passwordReset };
