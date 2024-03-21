import { logger } from '~/common/logger/logger.js';

import { MessageController } from './message.controller.js';
import { MessageModel } from './message.model.js';
import { MessageRepository } from './message.repository.js';
import { MessageService } from './message.service.js';

const messageRepository = new MessageRepository(MessageModel);
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(logger, messageService);

export { messageController, messageService };
export { MessageAttributes } from './enums/enums.js';
export { MessageEntity } from './message.entity.js';
export { MessageModel } from './message.model.js';
