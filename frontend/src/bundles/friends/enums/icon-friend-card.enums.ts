import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { IconName } from '~/bundles/common/components/icon/enums/icon-name.enum.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const IconFriendCard = {
    ICON: IconName.messageIcon,
    SIZE: ComponentSize.MEDIUM,
    COLOR_IS_FRIEND: IconColor.PRIMARY,
    COLOR_NOT_FRIEND: IconColor.SECONDARY,
};

export { IconFriendCard };
