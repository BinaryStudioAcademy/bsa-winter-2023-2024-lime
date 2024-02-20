import { PlusIcon } from '@heroicons/react/20/solid';

import { useLocation } from '~/bundles/common/hooks/hooks.js';

import { Button, ButtonSize, ButtonVariant } from '../components.js';
import { SubNavItem } from './components/sub-nav-item.js';

type Properties = {
    items: { label: string; to: string }[];
    title?: string;
    button?: { label: string; onClick: () => void };
};

const SubNavigation = ({ items, title, button }: Properties): JSX.Element => {
    const { pathname } = useLocation();

    const bgColors = [
        'bg-lm-yellow-100',
        'bg-lm-magenta',
        'bg-lm-purple',
        'bg-lm-green',
    ];

    return (
        <div className="bg-lm-black-200 flex h-full w-[20rem] flex-col gap-[1.75rem] p-[2.5rem]">
            {title && <h1 className="text-xl font-bold text-white">{title}</h1>}
            {items.map((item, index) => (
                <SubNavItem
                    key={index}
                    label={item.label}
                    to={item.to}
                    isActive={pathname === item.to}
                    bgColor={
                        bgColors[index % bgColors.length] ?? 'bg-lm-purple'
                    }
                />
            ))}
            {button && (
                <Button
                    label={button.label}
                    onClick={button.onClick}
                    size={ButtonSize.SMALL}
                    leftIcon={<PlusIcon className="h-5 w-5" />}
                    variant={ButtonVariant.SECONDARY}
                />
            )}
        </div>
    );
};

export { SubNavigation };
