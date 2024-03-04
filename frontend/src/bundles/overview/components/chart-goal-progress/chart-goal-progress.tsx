import { Select } from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type SingleValue } from '~/bundles/common/types/types.js';

import { BarChart } from '../components.js';
import { dataMappingSelectDatabase as dataMapping } from './helpers/data-select-database-mapping.helper.js';
import { weeklyData } from './mock-database/mock-database-goal.js';

const selectData: SelectOption[] = [
    {
        value: 'weekly',
        label: 'Weekly',
    },
    {
        value: 'monthly',
        label: 'Monthly',
    },
    {
        value: 'yearly',
        label: 'Yearly',
    },
];

const ChartGoalProgress = (): JSX.Element => {
    const [currentData, setCurrentData] = useState<SelectOption>(
        selectData[0] as SelectOption,
    );

    const { control, errors } = useAppForm({
        defaultValues: {
            select: currentData.value,
        },
        mode: 'onChange',
    });

    const handleChange = useCallback((newValue: SingleValue<SelectOption>) => {
        if (newValue) {
            setCurrentData(newValue);
        }
    }, []);

    return (
        <div className="bg-secondary rounded-30 relative max-w-[990px] p-8">
            <div className="flex h-10 items-center justify-between">
                <h1 className="text-secondary">Goal Progress</h1>
                <div>
                    <Select
                        className="bg-secondary w-[100px] text-xs"
                        control={control}
                        name="select"
                        options={selectData}
                        errors={errors}
                        value={currentData}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <BarChart
                chartData={dataMapping[currentData.value] ?? weeklyData}
            />
        </div>
    );
};

export { ChartGoalProgress };
