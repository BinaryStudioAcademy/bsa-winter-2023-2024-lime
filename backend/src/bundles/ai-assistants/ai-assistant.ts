import { logger } from '~/common/logger/logger.js';
import { openAIService } from '~/common/services/services.js';

import { messageService } from '../messages/messages.js';
import { AiAssistantController } from './ai-assistant.controller.js';
import { AiAssistantService } from './ai-assistant.service.js';

const aiAssistantService = new AiAssistantService(
    openAIService,
    messageService,
);
const aiAssistantController = new AiAssistantController(
    logger,
    aiAssistantService,
);

export { aiAssistantController };
