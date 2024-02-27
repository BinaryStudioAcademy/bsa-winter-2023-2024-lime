import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const GoalFrequency = {
    ONE_PER_DAY: '1 day',
    TWO_PER_DAY: '2 day',
    ONE_PER_WEEK: '1 week',
    TWO_PER_WEEK: '2 week',
    THREE_PER_WEEK: '3 week',
    FIVE_PER_WEEK: '5 week',
    SEVEN_PER_WEEK: '7 week',
} as const;

const goalFrequencyToLabel: Record<ValueOf<typeof GoalFrequency>, string> = {
    [GoalFrequency.ONE_PER_DAY]: '1 time a day',
    [GoalFrequency.TWO_PER_DAY]: '2 times a day',
    [GoalFrequency.ONE_PER_WEEK]: '1 time per week',
    [GoalFrequency.TWO_PER_WEEK]: '2 times per week',
    [GoalFrequency.THREE_PER_WEEK]: '3 times per week',
    [GoalFrequency.FIVE_PER_WEEK]: '5 times per week',
    [GoalFrequency.SEVEN_PER_WEEK]: '7 times per week',
};

const goalFrequencyOpitons: SelectOption[] = Object.entries(
    goalFrequencyToLabel,
).map(([value, label]) => ({
    value,
    label,
}));

export { GoalFrequency, goalFrequencyOpitons };
