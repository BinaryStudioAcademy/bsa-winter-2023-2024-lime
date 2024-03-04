import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { UnicodePattern } from './constants/constants.js';

const userUpdateProfile = z
    .object({
        fullName: z.union([
            z
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
                })
                .nullable(),
            z.literal(''),
        ]),
        username: z.union([
            z
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
                })
                .nullable(),
            z.literal(''),
        ]),
        dateOfBirth: z.union([
            z
                .string()
                .regex(
                    UnicodePattern.BIRTHDATE_PATTERN,
                    UserValidationMessage.BIRTHDATE_FORMAT,
                )
                .nullable(),
            z.literal(''),
        ]),
        weight: z.union([
            z.coerce
                .number()
                .nullable()
                .refine(
                    (value) => {
                        if (!value) {
                            return true;
                        }
                        return (
                            value >= UserValidationRule.WEIGHT.MIN_VALUE &&
                            value <= UserValidationRule.WEIGHT.MAX_VALUE
                        );
                    },
                    {
                        message: UserValidationMessage.WEIGHT_VALUE,
                    },
                ),
            z.literal(''),
        ]),
        height: z.union([
            z.coerce
                .number()
                .refine(
                    (value) => {
                        if (!value) {
                            return true;
                        }
                        return (
                            value >= UserValidationRule.HEIGHT.MIN_VALUE &&
                            value <= UserValidationRule.HEIGHT.MAX_VALUE
                        );
                    },
                    {
                        message: UserValidationMessage.HEIGHT_VALUE,
                    },
                )
                .nullable(),
            z.literal(''),
        ]),
        gender: z.union([
            z.literal('male'),
            z.literal('female'),
            z.literal('prefer not to say'),
        ]),
    })
    .required();

export { userUpdateProfile };
