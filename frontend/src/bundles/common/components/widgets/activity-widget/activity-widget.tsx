import { type ReactNode } from 'react';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    label: string;
    value: string;
    color: ValueOf<typeof ActivityWidgetColor>;
    icon: ReactNode;
};

const ActivityWidgetColor = {
    YELLOW: 'yellow',
    MAGENTA: 'magenta',
    PURPLE: 'purple',
} as const;

const ActivityWidget = ({
    label,
    value,
    color,
    icon,
}: Properties): JSX.Element => {
    const classes = {
        base: 'w-[15.625rem] h-[10.5rem] rounded-[0.5rem] text-white p-[1rem] flex gap-[1rem] bg-no-repeat bg-bottom',
        icon: 'h-[2.5rem] w-[2.5rem] rounded-[0.25rem] flex items-center justify-center',
    };

    const activityWidgetColorToClasses: Record<
        ValueOf<typeof ActivityWidgetColor>,
        { base: string; icon: string }
    > = {
        [ActivityWidgetColor.YELLOW]: {
            base: 'bg-lm-yellow-200 bg-wave-yellow',
            icon: 'bg-lm-yellow-100',
        },
        [ActivityWidgetColor.MAGENTA]: {
            base: 'bg-lm-magenta-200 bg-wave-magenta',
            icon: 'bg-lm-magenta-100',
        },
        [ActivityWidgetColor.PURPLE]: {
            base: 'bg-lm-purple-200 bg-wave-purple',
            icon: 'bg-lm-purple-100',
        },
    };

    return (
        <>
            <div
                className={getValidClassNames(
                    classes.base,
                    activityWidgetColorToClasses[color].base,
                )}
            >
                <div
                    className={getValidClassNames(
                        classes.icon,
                        activityWidgetColorToClasses[color].icon,
                    )}
                >
                    {icon}
                </div>
                <div>
                    <h3 className="text-base font-extrabold leading-5">
                        {label}
                    </h3>
                    <h4 className="leading-1 text-xs font-normal">{value}</h4>
                </div>
            </div>
        </>
    );
};

export { ActivityWidget, ActivityWidgetColor };
