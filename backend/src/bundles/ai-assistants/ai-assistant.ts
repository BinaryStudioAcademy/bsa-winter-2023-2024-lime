import { logger } from '~/common/logger/logger.js';
import { openAIService } from '~/common/services/services.js';

import { MessageRepository } from '../messages/message.repository.js';
import { MessageModel } from '../messages/messages.js';
import { AiAssistantController } from './ai-assistant.controller.js';
import { AiAssistantService } from './ai-assistant.service.js';

const messageRepository = new MessageRepository(MessageModel);

const aiAssistantService = new AiAssistantService(
    openAIService,
    messageRepository,
);
const aiAssistantController = new AiAssistantController(
    logger,
    aiAssistantService,
);

export { aiAssistantController };
