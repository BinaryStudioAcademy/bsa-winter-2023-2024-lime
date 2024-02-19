import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { UnicodePattern } from './constants/constants.js';

type UserUpdateProfileRequestValidationDto = {
    fullname: z.ZodString;
    nickname: z.ZodString;
    dateOfBirth: z.ZodString;
    weight: z.ZodString;
    height: z.ZodString;
    gender: z.ZodUnion<
        [
            z.ZodLiteral<'male'>,
            z.ZodLiteral<'female'>,
            z.ZodLiteral<'prefer not to say'>,
        ]
    >;
};

const userUpdateProfile = z
    .object<UserUpdateProfileRequestValidationDto>({
        fullname: z
            .string()
            .trim()
            .regex(UnicodePattern.FULLNAME_PATTERN, {
                message: UserValidationMessage.FULLNAME_WRONG,
            })
            .min(UserValidationRule.FULLNAME.MIN_LENGTH, {
                message: UserValidationMessage.FULLNAME_LENGTH,
            })
            .max(UserValidationRule.FULLNAME.MAX_LENGTH, {
                message: UserValidationMessage.FULLNAME_LENGTH,
            }),
        nickname: z
            .string()
            .trim()
            .regex(UnicodePattern.NICKNAME_PATTERN, {
                message: UserValidationMessage.NICKNAME_WRONG,
            })
            .min(UserValidationRule.NICKNAME.MIN_LENGTH, {
                message: UserValidationMessage.NICKNAME_LENGTH,
            })
            .max(UserValidationRule.FULLNAME.MAX_LENGTH, {
                message: UserValidationMessage.FULLNAME_LENGTH,
            }),
        dateOfBirth: z
            .string()
            .regex(
                UnicodePattern.BIRTHDATE_PATTERN,
                UserValidationMessage.BIRTHDATE_FORMAT,
            ),
        weight: z
            .string()
            .regex(UnicodePattern.WEIGHT_PATTERN, {
                message: UserValidationMessage.WEIGHT_WRONG,
            })
            .min(UserValidationRule.WEIGHT.MIN_LENGTH, {
                message: UserValidationMessage.WEIGHT_LENGTH,
            })
            .max(UserValidationRule.WEIGHT.MAX_LENGTH, {
                message: UserValidationMessage.WEIGHT_LENGTH,
            }),
        height: z
            .string()
            .regex(UnicodePattern.HEIGHT_PATTERN, {
                message: UserValidationMessage.HEIGHT_WRONG,
            })
            .min(UserValidationRule.HEIGHT.MIN_LENGTH, {
                message: UserValidationMessage.HEIGHT_LENGTH,
            })
            .max(UserValidationRule.HEIGHT.MAX_LENGTH, {
                message: UserValidationMessage.HEIGHT_LENGTH,
            }),
        gender: z.union([
            z.literal('male'),
            z.literal('female'),
            z.literal('prefer not to say'),
        ]),
    })
    .required();

export { userUpdateProfile };
