import {
    Button,
    ButtonVariant,
    Link,
} from '~/bundles/common/components/components.js';
import { addSizePropertyHeroIcons } from '~/bundles/common/components/icon/helpers/helpers.js';
import { type AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type SidebarNavProperties = {
    text: string;
    icon: JSX.Element;
    to: ValueOf<typeof AppRoute>;
    isActive?: boolean;
    isOpen?: boolean;
};

const SidebarNav = ({
    text,
    to,
    icon,
    isActive = false,
    isOpen = true,
}: SidebarNavProperties): JSX.Element => {
    const classes = {
        active: 'text-lm-black-100 hover:text-lm-black-200',
        inactive: 'text-lm-grey-200 hover:text-lm-black-400',
    };

    const enhacedIcon = addSizePropertyHeroIcons({
        icon,
        size: ComponentSize.MEDIUM,
    });

    return (
        <Link to={to} className="flex items-center justify-center">
                <Button
                    type="button"
                    label={isOpen ? text : ''}
                    className={getValidClassNames(
                        isActive ? classes.active : classes.inactive,
                        isOpen ? '' : 'h-12 w-12 justify-end'
                    )}
                    leftIcon={enhacedIcon}
                    variant={ButtonVariant.SIDEBAR}
                    isActive={isActive}
                    size={ComponentSize.MEDIUM}
                />
        </Link>
    );
};

export { SidebarNav };
