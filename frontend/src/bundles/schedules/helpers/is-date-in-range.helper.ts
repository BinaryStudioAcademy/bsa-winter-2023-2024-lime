import { getDate, getMonth, getYear, parseISO } from 'date-fns';

const ZERO_VALUE = 0;
const baseComparison = (
    firstDifference: string,
    secondDifference: string,
): number[] => {
    const yearComparison = getYear(firstDifference) - getYear(secondDifference);
    const monthComparison =
        getMonth(firstDifference) - getMonth(secondDifference);
    const dayComparison = getDate(firstDifference) - getDate(secondDifference);
    return [yearComparison, monthComparison, dayComparison];
};

const calcStartDiffs = (date: string, start: string): number[] => {
    const comparison = baseComparison(date, start);
    if (!comparison.every((item) => item >= ZERO_VALUE)) {
        return comparison;
    }

    const parsedDate = parseISO(date);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const scheduleDate = parsedDate.getDate();
    const scheduleHour = parsedDate.getHours();

    if (currentDay !== scheduleDate) {
        return comparison;
    }

    const hourDifference = scheduleHour - currentHour;
    return [
        ...comparison,
        hourDifference > ZERO_VALUE ? ZERO_VALUE : hourDifference,
    ];
};

const isDateInRange = (
    date: string,
    start: string,
    end: string | undefined,
): boolean => {
    const startDiffs = calcStartDiffs(date, start);

    if (!end) {
        return startDiffs.every((item) => item === ZERO_VALUE);
    }

    const endDiffs = baseComparison(date, end);

    return (
        startDiffs.every((item) => item >= ZERO_VALUE) &&
        endDiffs.every((item) => item <= ZERO_VALUE)
    );
};

export { isDateInRange };
