import { z } from 'zod';

type MessageRequestValidationDto = {
    chatId: z.ZodNumber;
    text: z.ZodString;
};

const messageValidationSchema = z.object<MessageRequestValidationDto>({
    chatId: z.number(),
    text: z.string().trim().min(1),
});

export { messageValidationSchema };
