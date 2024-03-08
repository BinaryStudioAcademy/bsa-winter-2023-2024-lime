import {
    setGoalActivityOptions,
    setGoalFrequencyOpitons,
} from '~/bundles/common/components/create-goal-form/helpers/helpers.js';

const DEFAULT_CREATE_GOAL_PAYLOAD = {
    activity: setGoalActivityOptions[0]?.value as string,
    frequency: setGoalFrequencyOpitons[0]?.value as string,
    distance: '',
    duration: '',
};

export { DEFAULT_CREATE_GOAL_PAYLOAD };
