import { notificationService } from '~/bundles/notifications/notifications.js';
import { ScheduleRepository } from '~/bundles/schedules/schedule.repository.js';
import { ScheduleService } from '~/bundles/schedules/schedule.service.js';
import { logger } from '~/common/logger/logger.js';

import { ScheduleController } from './schedule.controller.js';
import { ScheduleModel } from './schedule.model.js';

const scheduleRepository = new ScheduleRepository(ScheduleModel);
const scheduleService = new ScheduleService(
    scheduleRepository,
    notificationService,
);
const scheduleController = new ScheduleController(logger, scheduleService);

export { scheduleController, scheduleService };
export { ScheduleEntity } from './schedule.entity.js';
export { ScheduleModel } from './schedule.model.js';
