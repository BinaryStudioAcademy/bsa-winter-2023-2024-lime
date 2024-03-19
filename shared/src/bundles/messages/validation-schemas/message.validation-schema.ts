import { z } from 'zod';

type MessageRequestValidationDto = {
    chatId: z.ZodNumber;
    text: z.ZodString;
    membersId: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
};

const messageValidationSchema = z.object<MessageRequestValidationDto>({
    chatId: z.number(),
    text: z.string().trim().min(1),
    membersId: z.number().array().optional(),
});

export { messageValidationSchema };
