import { type ScheduleRequestDto as GlobalScheduleRequestDto } from 'shared';

type ScheduleRequestDto = GlobalScheduleRequestDto & {
    userId: number
};

export { type ScheduleRequestDto };
