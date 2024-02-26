import { capitalizeString } from '~/bundles/common/helpers/helpers.js';

import { CircleProgress } from '../components.js';

type Properties = {
    activity?: string;
    achievement?: string;
};

const FinishedGoalCard = ({
    activity,
    achievement,
}: Properties): JSX.Element => {
    return (
        <div className="bg-lm-black-100 bg-goalWidget flex h-40 w-full items-center justify-between rounded-xl px-6 py-5">
            <div className="">
                <p className="font-heavybold text-lm-black-100 line text-[1.5rem] leading-7">
                    {achievement
                        ? 'The goal completed!'
                        : 'Unleash your fitness potential with new goals'}
                </p>
                {achievement && (
                    <p className="text-lm-black-100 line leading-3xl text-sm font-bold">
                        Do not give up!
                    </p>
                )}
            </div>
            {achievement && (
                <div className="flex items-center gap-3.5 text-white">
                    <p className="text-base font-extrabold">
                        {capitalizeString(activity as string)}
                    </p>
                    <div className="h-32 w-32">
                        <CircleProgress
                            progress={100}
                            achievement={achievement}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export { FinishedGoalCard };
