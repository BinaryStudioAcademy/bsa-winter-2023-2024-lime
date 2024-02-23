const Activity = {
    WALKING: 'walking',
    RUNNING: 'running',
    CYCLING: 'cycling',
} as const;

const FrequencyType = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
} as const;

export { AuthApiPath } from 'shared';
export { Activity, FrequencyType };
