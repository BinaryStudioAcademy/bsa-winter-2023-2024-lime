import { Button, ButtonSize, ButtonVariant, Icon } from '../components.js';
import { IconSize } from '../icon/enums/enums.js';
import { SubNavItem } from './components/sub-nav-item.js';

type Properties = {
    items: { label: string; isActive: boolean; onClick: () => void }[];
    title?: string;
    button?: { label: string; onClick: () => void };
};

const SubNavigation = ({ items, title, button }: Properties): JSX.Element => {
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
                    onClick={item.onClick}
                    isActive={item.isActive}
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
                    leftIcon={<Icon name="plus" size={IconSize.SMALL} />}
                    variant={ButtonVariant.SECONDARY}
                />
            )}
        </div>
    );
};

export { SubNavigation };
