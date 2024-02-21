import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const GoalVariant = {
    RUNNING: 'running',
    FITNESS: 'fitness',
} as const;

type Properties = {
    title: string;
    frequency: string;
    variant: ValueOf<typeof GoalVariant>;
};

const baseClasses = 'h-[45px] w-[45px] rounded';

const GoalVariantToClasses: Record<ValueOf<typeof GoalVariant>, string> = {
    [GoalVariant.RUNNING]: 'bg-[#05CFCF]',
    [GoalVariant.FITNESS]: 'bg-[#056ECF]',
};

const GoalCard: React.FC<Properties> = ({
    title,
    frequency,
    variant,
}): JSX.Element => {
    return (
        <div className="bg-lm-black-100 flex h-full w-full items-center gap-4 rounded-xl p-5 pl-8">
            <div
                className={getValidClassNames(
                    baseClasses,
                    GoalVariantToClasses[variant],
                )}
            ></div>
            <div className="flex flex-col">
                <p className="text-base font-extrabold leading-5 text-white">
                    {title}
                </p>
                <p className="text-lm-grey-200 text-xs font-normal leading-3">
                    {frequency}
                </p>
            </div>
        </div>
    );
};

export { GoalCard, GoalVariant };
