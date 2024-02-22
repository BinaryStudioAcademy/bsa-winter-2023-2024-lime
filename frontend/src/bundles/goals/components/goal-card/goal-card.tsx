import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

const GoalVariant = {
    WALKING: 'walking',
    RUNNING: 'running',
    CYCLING: 'cycling',
} as const;

type Properties = {
    activity: string;
    frequency: number;
    progress: number;
};

const baseClasses = 'h-[45px] w-[45px] rounded';

const GoalVariantToClasses: Record<string, string> = {
    [GoalVariant.WALKING]: 'bg-[#05CFCF]',
    [GoalVariant.RUNNING]: 'bg-[#056ECF]',
    [GoalVariant.CYCLING]: 'bg-[#DC40CD]',
};

const GoalCard: React.FC<Properties> = ({
    activity,
    frequency,
}): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex h-[7.5rem] h-full w-96 items-center gap-4 rounded-xl p-5 pl-8">
            <div
                className={getValidClassNames(
                    baseClasses,
                    GoalVariantToClasses[activity],
                )}
            ></div>
            <div className="flex flex-col">
                <p className="text-base font-extrabold leading-5 text-white">
                    {activity}
                </p>
                <p className="text-lm-grey-200 text-xs font-normal leading-3">
                    {frequency}
                </p>
            </div>
        </div>
    );
};

export { GoalCard, GoalVariant };
