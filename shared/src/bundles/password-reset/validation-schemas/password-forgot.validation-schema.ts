import { z } from 'zod';

import {
    UserValidationMessage,
    UserValidationRule,
} from '../../users/enums/enums.js';

type PasswordForgotRequestValidationDto = {
    email: z.ZodString;
};

const passwordForgot = z
    .object<PasswordForgotRequestValidationDto>({
        email: z
            .string()
            .trim()
            .min(1, {
                message: UserValidationMessage.REQUIRED,
            })
            .min(UserValidationRule.EMAIL.MIN_LENGTH, {
                message: UserValidationMessage.INVALID_EMAIL,
            })
            .max(UserValidationRule.EMAIL.MAX_LENGTH, {
                message: UserValidationMessage.INVALID_EMAIL,
            })
            .email({
                message: UserValidationMessage.INVALID_EMAIL,
            }),
    })
    .refine(
        (value) => {
            const [local, domain] = value.email.split('@');
            const { EMAIL } = UserValidationRule;

            return (
                local &&
                local.length >= EMAIL.LOCAL_MIN_LENGTH &&
                local.length <= EMAIL.LOCAL_MAX_LENGTH &&
                domain &&
                domain.length >= EMAIL.DOMAIN_MIN_LENGTH &&
                domain.length <= EMAIL.DOMAIN_MAX_LENGTH
            );
        },
        {
            message: UserValidationMessage.INVALID_EMAIL,
            path: ['email'],
        },
    );

export { passwordForgot };
