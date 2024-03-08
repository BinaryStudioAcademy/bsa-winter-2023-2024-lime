import { GoalFrequency } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const goalFrequencyToLabel: Record<ValueOf<typeof GoalFrequency>, string> = {
    [GoalFrequency.ONE_PER_DAY]: '1 time a day',
    [GoalFrequency.TWO_PER_DAY]: '2 times a day',
    [GoalFrequency.ONE_PER_WEEK]: '1 time per week',
    [GoalFrequency.TWO_PER_WEEK]: '2 times per week',
    [GoalFrequency.THREE_PER_WEEK]: '3 times per week',
    [GoalFrequency.FIVE_PER_WEEK]: '5 times per week',
    [GoalFrequency.SEVEN_PER_WEEK]: '7 times per week',
};

export { goalFrequencyToLabel };
