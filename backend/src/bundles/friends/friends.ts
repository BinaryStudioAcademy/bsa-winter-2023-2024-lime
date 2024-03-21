import { notificationService } from '~/bundles/notifications/notifications.js';
import { UserModel } from '~/bundles/users/user.model.js';
import { userService } from '~/bundles/users/users.js';
import { logger } from '~/common/logger/logger.js';

import { FriendController } from './friend.controller.js';
import { FriendModel } from './friend.model.js';
import { FriendRepository } from './friend.repository.js';
import { FriendService } from './friend.service.js';

export {
    type FriendRequestDto,
    type FriendResponseDto,
} from './types/types.js';

const friendRepository = new FriendRepository(FriendModel, UserModel);

const friendService = new FriendService(
    friendRepository,
    userService,
    notificationService,
);
const friendController = new FriendController(logger, friendService);

export { friendController, friendRepository, friendService };
export { UserDetailsModel } from '../users/user-details.model.js';
export { FriendController } from './friend.controller.js';
export { FriendEntity } from './friend.entity.js';
export { FriendModel } from './friend.model.js';
export { FriendRepository } from './friend.repository.js';
export { FriendService } from './friend.service.js';
