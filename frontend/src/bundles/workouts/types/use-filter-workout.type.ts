import { type WorkoutResponseDto } from 'shared';

import { type SelectOption } from '~/bundles/common/components/select/types/select.type.js';
import { type SingleValue } from '~/bundles/common/types/types.js';

type Options = {
    items: SelectOption[];
    selected: SelectOption;
};

type UseFilterWorkout = {
    options: {
        year: Options;
        activity: Options;
    };
    handles: {
        handleFilter: (
            newValue: SingleValue<SelectOption>,
            filterType: string,
        ) => void;
        handleReset: () => void;
    };
    filteredWorkouts: WorkoutResponseDto[];
};

export { type UseFilterWorkout };
