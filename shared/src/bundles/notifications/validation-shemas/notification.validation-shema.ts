import { z } from 'zod';

import { NotificationType } from '../enums/enums.js';

type NotificationValidationDto = {
    type: z.ZodOptional<z.ZodNativeEnum<typeof NotificationType>>;
    isRead: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
};

const notification = z.object<NotificationValidationDto>({
    type: z.nativeEnum(NotificationType).optional(),
    isRead: z.boolean().optional(),
    title: z.string().trim().min(1).optional(),
    message: z.string().trim().min(1),
});

export { notification };
