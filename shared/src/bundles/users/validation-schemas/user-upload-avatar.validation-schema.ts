import { z } from 'zod';

import { type File } from '../../file/file.js';
import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

const userUploadAvatar = z.object({
    image: z
        .any()
        .refine((file: File) => file != undefined, {
            message: UserValidationMessage.FILE_REQUIRED,
        })
        .refine(
            (file: File) => {
                if (file && file.size != undefined) {
                    return file.size <= UserValidationRule.AVATAR_MAX_SIZE;
                }
            },
            {
                message: UserValidationMessage.FILE_SIZE_EXCEEDED,
            },
        )
        .refine(
            (file: File) => {
                if (file && file.mimetype) {
                    return UserValidationRule.AVATAR_ALLOWED_TYPES.some(
                        (type) => file.mimetype.includes(type),
                    );
                }
            },
            {
                message: UserValidationMessage.FILE_TYPE_NOT_ALLOWED,
            },
        ),
});

export { userUploadAvatar };
