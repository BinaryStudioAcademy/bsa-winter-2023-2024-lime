type FrequencyType = {
    label: string;
    value: string;
};

const Label = {
    ONE_PER_DAY: '1 time a day',
    TWO_PER_DAY: '2 times per day',
    ONE_PER_WEEK: '1 time per week',
    TWO_PER_WEEK: '2 time per week',
    THREE_PER_WEEK: '3 time per week',
    FIVE_PER_WEEK: '5 time per week',
    SEVEN_PER_WEEK: '7 time per week',
} as const;

const FrequencyValue = {
    ONE_PER_DAY: '1 day',
    TWO_PER_DAY: '2 day',
    ONE_PER_WEEK: '1 week',
    TWO_PER_WEEK: '2 week',
    THREE_PER_WEEK: '3 week',
    FIVE_PER_WEEK: '5 week',
    SEVEN_PER_WEEK: '7 week',
} as const;

const goalFrequency: FrequencyType[] = [
    { label: Label.ONE_PER_DAY, value: FrequencyValue.ONE_PER_DAY },
    { label: Label.TWO_PER_DAY, value: FrequencyValue.TWO_PER_DAY },
    { label: Label.ONE_PER_WEEK, value: FrequencyValue.ONE_PER_WEEK },
    { label: Label.TWO_PER_WEEK, value: FrequencyValue.THREE_PER_WEEK },
    { label: Label.THREE_PER_WEEK, value: FrequencyValue.THREE_PER_WEEK },
    { label: Label.FIVE_PER_WEEK, value: FrequencyValue.FIVE_PER_WEEK },
    { label: Label.SEVEN_PER_WEEK, value: FrequencyValue.SEVEN_PER_WEEK },
];

export { FrequencyValue, goalFrequency };
