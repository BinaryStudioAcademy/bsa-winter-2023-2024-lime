import { type ChartData } from 'chart.js';

import { DoughnutChart } from '~/bundles/common/components/components.js';
import {
    capitalizeFirstLetter,
    convertMetersToKilometers,
} from '~/bundles/common/helpers/helpers.js';
import {
    DOUGHNUT_OPTIONS,
    PLURAL,
} from '~/bundles/schedules/constants/constants.js';

import { type GoalResponseDto } from '../types/types.js';

type Properties = {
    goal: GoalResponseDto;
    doughnutData: ChartData<'doughnut'>;
};

const ScheduleWidget: React.FC<Properties> = ({
    goal,
    doughnutData,
}): JSX.Element => {
    const {
        activityType,
        frequency,
        frequencyType,
        progress,
        distance,
        duration,
    } = goal;

    return (
        <div className="bg-scheduleWidget bg-primary text-card flex h-full max-h-[20rem] w-full flex-col items-center gap-[1.2rem] rounded-lg p-7 font-bold lg:max-w-[23.75rem]">
            <div>{capitalizeFirstLetter(activityType)}</div>
            <div>
                <span>
                    {frequency} time
                    {frequency > 1 && PLURAL}
                </span>
                :
                <span>
                    {distance
                        ? `${convertMetersToKilometers(distance)} km`
                        : `${duration} min`}
                </span>
                /<span>{frequencyType}</span>
            </div>
            {doughnutData && (
                <div className="relative">
                    <DoughnutChart
                        className="h-[2.7rem] w-[11rem]"
                        data={doughnutData}
                        options={DOUGHNUT_OPTIONS}
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        {progress} %
                    </span>
                </div>
            )}
        </div>
    );
};

export { ScheduleWidget };
