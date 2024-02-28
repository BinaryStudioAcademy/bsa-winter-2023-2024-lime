import { PlusIcon } from '@heroicons/react/20/solid';

import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

import { Button, ButtonVariant } from '../components.js';
import { SubNavItem } from './components/sub-nav-item.js';

type Properties = {
    items: { id: string; label: string; to: string }[];
    title?: string;
    button?: { label: string; onClick: () => void };
};

const SubNavigation = ({ items, title, button }: Properties): JSX.Element => {
    const bgColors = [
        'bg-lm-yellow-100',
        'bg-lm-magenta-200',
        'bg-lm-purple-200',
        'bg-lm-green',
    ];

    return (
        <div className="bg-lm-black-200 flex h-full w-[20rem] flex-col gap-[1.75rem] overflow-auto p-[2.5rem]">
            {title && <h1 className="text-xl font-bold text-white">{title}</h1>}
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
