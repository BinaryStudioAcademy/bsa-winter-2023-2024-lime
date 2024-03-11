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

const CUSTON_ERROR_MESSAGE = {
    NOT_FLOAT_MESSAGE: 'Should contain only numbers or decimal numbers.',
    NOT_INTEGER_MESSAGE: 'Should contain only numbers.',
};

export { CUSTON_ERROR_MESSAGE, DEFAULT_CREATE_GOAL_PAYLOAD };
