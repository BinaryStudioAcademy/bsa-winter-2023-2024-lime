import { logger } from '~/common/logger/logger.js';
import { openAIService } from '~/common/services/services.js';

import { ChatModel } from '../chats/chat.model.js';
import { ChatRepository } from '../chats/chat.repository.js';
import { MessageRepository } from '../messages/message.repository.js';
import { MessageModel } from '../messages/messages.js';
import { AiAssistantController } from './ai-assistant.controller.js';
import { AiAssistantService } from './ai-assistant.service.js';

const chatRepository = new ChatRepository(ChatModel);
const messageRepository = new MessageRepository(MessageModel);

const aiAssistantService = new AiAssistantService(
    openAIService,
    chatRepository,
    messageRepository,
);
const aiAssistantController = new AiAssistantController(
    logger,
    aiAssistantService,
);

export { aiAssistantController };
