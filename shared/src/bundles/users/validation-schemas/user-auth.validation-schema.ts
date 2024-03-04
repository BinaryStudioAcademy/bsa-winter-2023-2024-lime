import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserAuthRequestValidationDto = {
    email: z.ZodString;
    password: z.ZodString;
};

const basicUserAuth = z.object<UserAuthRequestValidationDto>({
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

const userAuth = basicUserAuth.refine(
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

const userAuthPWConfirm = basicUserAuth
    .extend({
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
    )
    .refine((value) => value.password === value.passwordConfirm, {
        message: UserValidationMessage.PASSWORD_MISMATCH,
        path: ['passwordConfirm'],
    });

const passwordForgot = basicUserAuth.omit({ password: true });

const passwordReset = basicUserAuth
    .omit({ email: true })
    .extend({
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
        id: z.number().optional(),
        token: z.string().optional(),
    })
    .refine(
        (schema) => {
            return schema.password === schema.passwordConfirm;
        },
        {
            message: UserValidationMessage.PASSWORD_MISMATCH,
            path: ['passwordConfirm'],
        },
    );

export { passwordForgot, passwordReset, userAuth, userAuthPWConfirm };
