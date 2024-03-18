import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    tabs: string[];
    handleTabClick: (tab: string) => void;
    activeTab: string;
};

const classes = {
    base: 'transition-bg rounded-34 flex w-[120px] cursor-pointer items-center justify-center self-stretch px-4 py-3 text-center text-sm md:text-base duration-300 sm:w-[140px] md:w-[160px] lg:w-[180px]',
    active: 'bg-tertiary',
    background:
        'text-secondary bg-primary rounded-34 flex max-w-max items-center justify-between font-semibold leading-4 ',
};

const Tabs = ({ tabs, handleTabClick, activeTab }: Properties): JSX.Element => {
    const handleClick = useCallback(
        (tab: string) => {
            return () => {
                handleTabClick(tab);
            };
        },
        [handleTabClick],
    );

    return (
        <div className={getValidClassNames(classes.background)}>
            {tabs.map((tab) => (
                <div
                    key={tab}
                    onClick={handleClick(tab)}
                    className={getValidClassNames(
                        tab === activeTab
                            ? [classes.base, classes.active]
                            : [classes.base],
                    )}
                    role="presentation"
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};

export { Tabs };
