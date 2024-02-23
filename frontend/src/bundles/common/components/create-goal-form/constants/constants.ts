import { goalActivity, goalFrequency } from '../enums/enums.js';

const DEFAULT_CREATE_GOAL_PAYLOAD = {
    activity: goalActivity[0]?.value as string,
    frequency: goalFrequency[0]?.value as string,
    distance: '',
    duration: '',
};

export { DEFAULT_CREATE_GOAL_PAYLOAD };
