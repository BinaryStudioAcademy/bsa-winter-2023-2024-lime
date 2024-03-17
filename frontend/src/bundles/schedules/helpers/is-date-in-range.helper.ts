import { getDate, getMonth, getYear } from 'date-fns';

const calcDiffs = (
    firstDifference: string | Date,
    secondDifference: string,
): number[] => {
    const yearComparison = getYear(firstDifference) - getYear(secondDifference);
    const monthComparison =
        getMonth(firstDifference) - getMonth(secondDifference);
    const dayComparison = getDate(firstDifference) - getDate(secondDifference);
    return [yearComparison, monthComparison, dayComparison];
};

const isDateInRange = (
    date: string | Date,
    start: string,
    end: string | undefined,
): boolean => {
    const ZERO_VALUE = 0;
    const startDiffs = calcDiffs(date, start);

    if (!end) {
        return startDiffs.every((item) => item === ZERO_VALUE);
    }

    const endDiffs = calcDiffs(date, end);

    return (
        startDiffs.every((item) => item >= ZERO_VALUE) &&
        endDiffs.every((item) => item <= ZERO_VALUE)
    );
};

export { isDateInRange };
