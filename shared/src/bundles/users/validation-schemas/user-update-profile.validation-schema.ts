import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserUpdateProfileRequestValidationDto = {
    fullname: z.ZodString;
    nickname: z.ZodString;
    birthdate: z.ZodString;
    weight: z.ZodString;
    height: z.ZodString;
    gender: z.ZodUnion<
        [
            z.ZodLiteral<'Male'>,
            z.ZodLiteral<'Female'>,
            z.ZodLiteral<'Prefer not to say'>,
        ]
    >;
};

const userUpdateProfile = z
    .object<UserUpdateProfileRequestValidationDto>({
        fullname: z
            .string()
            .trim()
            .min(UserValidationRule.FULLNAME_MINIMUM_LENGTH, {
                message: UserValidationMessage.FULLNAME_LENGTH,
            })
            .max(UserValidationRule.FULLNAME_MAXIMUM_LENGTH, {
                message: UserValidationMessage.FULLNAME_LENGTH,
            }),
        nickname: z.string().trim(),
        birthdate: z
            .string()
            .regex(
                /^(?:\d{2}\/){2}\d{4}$/,
                UserValidationMessage.BIRTHDATE_FORMAT,
            ),
        weight: z
            .string()
            .min(UserValidationRule.WEIGHT_MINIMUM_LENGTH, {
                message: UserValidationMessage.WEIGHT_LENGTH,
            })
            .max(UserValidationRule.WEIGHT_MAXIMUM_LENGTH, {
                message: UserValidationMessage.WEIGHT_LENGTH,
            }),
        height: z
            .string()
            .min(UserValidationRule.HEIGHT_MINIMUM_LENGTH, {
                message: UserValidationMessage.HEIGHT_LENGTH,
            })
            .max(UserValidationRule.HEIGHT_MAXIMUM_LENGTH, {
                message: UserValidationMessage.HEIGHT_LENGTH,
            }),
        gender: z.union([
            z.literal('Male'),
            z.literal('Female'),
            z.literal('Prefer not to say'),
        ]),
    })
    .required();

export { userUpdateProfile };
