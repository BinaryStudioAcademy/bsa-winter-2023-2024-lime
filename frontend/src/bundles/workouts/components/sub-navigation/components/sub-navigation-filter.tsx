import { Select } from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type SingleValue } from '~/bundles/common/types/types.js';

type Options = {
    items: SelectOption[];
    selected: SelectOption;
};

type Properties = {
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
};

const SubNavigationFilter = ({ options, handles }: Properties): JSX.Element => {
    const { handleFilter, handleReset } = handles;

    const { control, errors } = useAppForm({
        defaultValues: {
            selectYear: options.year.items[0]?.value,
            selectActivity: options.activity.items[0]?.value,
        },
        mode: 'onChange',
    });

    const filterByYear = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            handleFilter(newValue, 'year');
        },
        [handleFilter],
    );

    const filterByActivity = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            handleFilter(newValue, 'activity');
        },
        [handleFilter],
    );

    return (
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
            <Select
                options={options.year.items}
                value={options.year.selected || options.year.items[0]}
                onChange={filterByYear}
                control={control}
                label="Year"
                name="selectYear"
                errors={errors}
                className="w-full min-w-20 flex-grow"
            />
            <Select
                options={options.activity.items}
                value={options.activity.selected || options.activity.items[0]}
                onChange={filterByActivity}
                control={control}
                name="selectActivity"
                label="Activity"
                errors={errors}
                className="w-28"
            />
            <button
                onClick={handleReset}
                className="text-primary ml-2 underline"
            >
                Reset
            </button>
            {errors.selectYear && (
                <p className="text-xs text-red-500">
                    {errors.selectYear.message}
                </p>
            )}
            {errors.selectActivity && (
                <p className="text-xs text-red-500">
                    {errors.selectActivity.message}
                </p>
            )}
        </div>
    );
};

export { SubNavigationFilter };
