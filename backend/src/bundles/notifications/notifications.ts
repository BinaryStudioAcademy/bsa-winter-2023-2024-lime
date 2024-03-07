import { logger } from '~/common/logger/logger.js';

import { NotificationController } from './notification.controller.js';
import { NotificationModel } from './notification.model.js';
import { NotificationRepository } from './notification.repository.js';
import { NotificationService } from './notification.service.js';

const notificationRepository = new NotificationRepository(NotificationModel);
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(
    logger,
    notificationService,
);

export { notificationController, notificationService };
export { NotificationsApiPath, NotificationType } from './enums/enums.js';
export {
    type CreateNotificationRequestDto,
    type NotificationRequestDto,
    type NotificationResponseDto,
    type Paged,
    type PaginationParameters,
} from './types/types.js';
export {
    notificationValidationSchema,
    paginationValidationSchema,
} from './validation-shemas/validation-shemas.js';
export { HttpCode, HttpError } from 'shared';
