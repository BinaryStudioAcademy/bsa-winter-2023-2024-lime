const ScheduleValidationMessage = {
    NOT_FOUND: 'Schedule was not found',
    SCHEDULE_WITH_SAME_DATE: 'Schedule with this date already exists',
    SCHEDULE_DATE_FORMAT: 'date must be in DD/MM/YYYY HH:mm format',
    SCHEDULE_DATE_WRONG: 'Wrong date',
} as const;

export { ScheduleValidationMessage };
