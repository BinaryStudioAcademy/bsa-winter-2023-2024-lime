import { z } from 'zod';

import { ParametersValidationMessage } from '../enums/enums.js';

const idParameterSchema = z.object({
    id: z
        .string()
        .regex(/^\d+$/, ParametersValidationMessage.INVALID_ID)
        .transform(Number),
});

export { idParameterSchema };
