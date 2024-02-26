import { z } from 'zod';

const idParameterSchema = z.object({
    id: z.coerce.number().min(1).int(),
});

export { idParameterSchema };
