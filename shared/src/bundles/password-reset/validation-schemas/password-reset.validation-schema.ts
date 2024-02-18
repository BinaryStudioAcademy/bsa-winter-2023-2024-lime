import { z } from 'zod';

import {
    UserValidationMessage,
    UserValidationRule,
} from '../../users/enums/enums.js';

type PasswordRequestValidationDto = {
    password: z.ZodString;
    passwordConfirm: z.ZodString;
};

const passwordReset = z
    .object<PasswordRequestValidationDto>({
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
        passwordConfirm: z
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
    })
    .refine(
        (schema) => {
            return schema.password === schema.passwordConfirm;
        },
        {
            message: 'Passwords must be identical. Please try again',
            path: ['passwordConfirm'],
        },
    );

export { passwordReset };
