import { PlusIcon } from '@heroicons/react/20/solid';

import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

import { Button, ButtonVariant } from '../components.js';
import { SubNavItem } from './components/sub-nav-item.js';

type Properties = {
    items: { id: string; label: string; to: string }[];
    title?: string;
    button?: { label: string; onClick: () => void };
    className?: string;
};

const SubNavigation: React.FC<Properties> = ({
    items,
    title,
    button,
    className = '',
}): JSX.Element => {
    const bgColors = [
        'bg-lm-yellow-100',
        'bg-lm-magenta-100',
        'bg-lm-purple-100',
        'bg-lm-green',
        'bg-lm-blue-400',
        'bg-lm-blue-500',
    ];

    return (
        <div
            className={`bg-secondary items center mx-auto flex h-full w-full flex-col gap-[1.75rem] overflow-auto p-[2rem] sm:max-w-full md:w-[20rem] ${className}`}
        >
            {title && (
                <h1 className="text-primary text-xl font-bold">{title}</h1>
            )}
            <div
                className={`flex h-full w-full justify-start gap-[1.75rem] sm:items-center sm:overflow-x-scroll md:flex-col md:items-start md:overflow-x-auto ${className}`}
            >
                {items.map((item, index) => (
                    <SubNavItem
                        key={item.id}
                        label={item.label}
                        to={item.to}
                        bgColor={
                            bgColors[index % bgColors.length] ?? 'bg-lm-purple'
                        }
                    />
                ))}
            </div>
            {button && (
                <Button
                    label={button.label}
                    onClick={button.onClick}
                    size={ComponentSize.SMALL}
                    leftIcon={<PlusIcon className="h-5 w-5" />}
                    variant={ButtonVariant.SECONDARY}
                />
            )}
        </div>
    );
};

export { SubNavigation };
