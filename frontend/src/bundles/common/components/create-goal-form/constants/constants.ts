import { goalActivityOptions, goalFrequencyOpitons } from '../enums/enums.js';

const DEFAULT_CREATE_GOAL_PAYLOAD = {
    activity: goalActivityOptions[0]?.value as string,
    frequency: goalFrequencyOpitons[0]?.value as string,
    distance: '',
    duration: '',
};

export { DEFAULT_CREATE_GOAL_PAYLOAD };
