import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserSignUpRequestValidationDto = {
    email: z.ZodString;
    password: z.ZodString;
    passwordConfirm: z.ZodString;
};

const userSignUp = z
    .object<UserSignUpRequestValidationDto>({
        email: z
            .string()
            .trim()
            .min(UserValidationRule.EMAIL_REQUIRED, {
                message: UserValidationMessage.EMAIL_REQUIRE,
            })
            .min(UserValidationRule.EMAIL_MIN_LENGTH, {
                message: UserValidationMessage.INVALID_EMAIL,
            })
            .max(UserValidationRule.EMAIL_MAX_LENGTH, {
                message: UserValidationMessage.INVALID_EMAIL,
            })
            .email({
                message: UserValidationMessage.INVALID_EMAIL,
            }),

        password: z
            .string()
            .trim()
            .min(UserValidationRule.PASSWORD_MIN_LENGTH, {
                message: UserValidationMessage.INVALID_PASSWORD,
            })
            .max(UserValidationRule.PASSWORD_MAX_LENGTH, {
                message: UserValidationMessage.INVALID_PASSWORD,
            }),

        passwordConfirm: z
            .string()
            .trim()
            .min(UserValidationRule.PASSWORD_MIN_LENGTH, {
                message: UserValidationMessage.INVALID_PASSWORD,
            })
            .max(UserValidationRule.PASSWORD_MAX_LENGTH, {
                message: UserValidationMessage.INVALID_PASSWORD,
            }),
    })
    .refine(
        (value) => {
            const [local, domain] = value.email.split('@');
            return (
                local &&
                local.length > 0 &&
                local.length < 65 &&
                domain &&
                domain.length > 3 &&
                domain.length < 255
            );
        },
        {
            message: UserValidationMessage.INVALID_EMAIL,
            path: ['email'],
        },
    )
    .refine((value) => value.password === value.passwordConfirm, {
        message: UserValidationMessage.PASSWORD_MISMATCH,
        path: ['passwordConfirm'],
    });

export { userSignUp };
