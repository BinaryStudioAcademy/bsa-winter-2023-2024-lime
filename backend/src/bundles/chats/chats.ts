import { logger } from '~/common/logger/logger.js';

import { FriendModel } from '../friends/friend.model.js';
import { ChatController } from './chat.controller.js';
import { ChatModel } from './chat.model.js';
import { ChatRepository } from './chat.repository.js';
import { ChatService } from './chat.service.js';

const chatRepository = new ChatRepository(ChatModel, FriendModel);
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(logger, chatService);

export { chatController };
export { ChatModel } from './chat.model.js';
export { ChatRepository } from './chat.repository.js';
export { ChatAttributes, ChatUserAttributes } from './enums/enums.js';
