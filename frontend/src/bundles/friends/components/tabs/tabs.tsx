import { useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    tabs: string[];
    handleTabClick: (tab: string) => void;
    activeTab: string;
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
        <div
            className={
                'text-secondary bg-primary rounded-34 flex max-w-[320px] justify-between font-semibold leading-4 '
            }
        >
            {tabs.map((tab) => (
                <div
                    key={tab}
                    onClick={handleClick(tab)}
                    className={`transition-bg rounded-34 w-[160px] cursor-pointer whitespace-nowrap px-4 py-3 text-center duration-300 ${tab === activeTab ? 'bg-tertiary' : ''}`}
                    role="presentation"
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};

export { Tabs };
