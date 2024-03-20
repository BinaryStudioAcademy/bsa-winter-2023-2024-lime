import { type WorkoutResponseDto } from 'shared';

type SelectOption = { value: string; label: string };

const mapWorkoutYearSelect = (data: WorkoutResponseDto[]): SelectOption[] => {
    const dataYears = data.map((item) => new Date(item.workoutStartedAt).getFullYear());
    const years = [...new Set(dataYears)];
    const sortedYears = years.sort((a, b) => b - a);
    const yearsOptions: SelectOption[] = sortedYears.map((year) => ({
        value: year.toString(),
        label: year.toString(),
    }));
    yearsOptions.unshift({ value: '', label: 'All' });
    return yearsOptions;
};

export { mapWorkoutYearSelect };
