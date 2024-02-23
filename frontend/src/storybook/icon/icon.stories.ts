import { type Meta, type StoryObj } from '@storybook/react';

import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const meta: Meta<typeof Icon> = {
    component: Icon,
    title: 'Components/Icon',
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof Icon>;

const ArrowSmall: Story = {
    args: {
        name: 'arrowDown',
        size: ComponentSize.SMALL,
    },
};
const ArrowMedium: Story = {
    args: {
        name: 'arrowDown',
        size: ComponentSize.MEDIUM,
    },
};
const ArrowLarge: Story = {
    args: {
        name: 'arrowDown',
        size: ComponentSize.LARGE,
    },
};
const ArrowExtraLarge: Story = {
    args: {
        name: 'arrowDown',
        size: ComponentSize.EXTRA_LARGE,
    },
};
const LogoSmallPrimary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.SMALL,
        color: IconColor.PRIMARY,
    },
};
const LogoMediumPrimary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.MEDIUM,
        color: IconColor.PRIMARY,
    },
};
const LogoLargePrimary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.LARGE,
        color: IconColor.PRIMARY,
    },
};
const LogoExtraLargePrimary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.EXTRA_LARGE,
        color: IconColor.PRIMARY,
    },
};
const LogoSmallSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.SMALL,
        color: IconColor.SECONDARY,
    },
};
const LogoMediumSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.MEDIUM,
        color: IconColor.SECONDARY,
    },
};
const LogoLargeSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.LARGE,
        color: IconColor.SECONDARY,
    },
};
const LogoExtraLargeSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: ComponentSize.EXTRA_LARGE,
        color: IconColor.SECONDARY,
    },
};
const NotFoundSmallPrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.SMALL,
        color: IconColor.PRIMARY,
    },
};
const NotFoundMediumPrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.MEDIUM,
        color: IconColor.PRIMARY,
    },
};
const NotFoundLargePrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.LARGE,
        color: IconColor.PRIMARY,
    },
};
const NotFoundExtraLargePrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.EXTRA_LARGE,
        color: IconColor.PRIMARY,
    },
};
const NotFoundSmallSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.SMALL,
        color: IconColor.SECONDARY,
    },
};
const NotFoundMediumSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.MEDIUM,
        color: IconColor.SECONDARY,
    },
};
const NotFoundLargeSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.LARGE,
        color: IconColor.SECONDARY,
    },
};
const NotFoundExtraLargeSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: ComponentSize.EXTRA_LARGE,
        color: IconColor.SECONDARY,
    },
};

export {
    ArrowExtraLarge,
    ArrowLarge,
    ArrowMedium,
    ArrowSmall,
    LogoExtraLargePrimary,
    LogoExtraLargeSecondary,
    LogoLargePrimary,
    LogoLargeSecondary,
    LogoMediumPrimary,
    LogoMediumSecondary,
    LogoSmallPrimary,
    LogoSmallSecondary,
    NotFoundExtraLargePrimary,
    NotFoundExtraLargeSecondary,
    NotFoundLargePrimary,
    NotFoundLargeSecondary,
    NotFoundMediumPrimary,
    NotFoundMediumSecondary,
    NotFoundSmallPrimary,
    NotFoundSmallSecondary,
};