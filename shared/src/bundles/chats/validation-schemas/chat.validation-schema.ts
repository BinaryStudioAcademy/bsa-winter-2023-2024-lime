import { z } from 'zod';

type ChatRequestValidationDto = {
    isAssistant: z.ZodBoolean;
    membersId: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
};

const chatValidationSchema = z.object<ChatRequestValidationDto>({
    isAssistant: z.boolean(),
    membersId: z.number().array().optional(),
});

export { chatValidationSchema };
