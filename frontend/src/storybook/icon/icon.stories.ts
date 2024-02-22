/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { IconSize } from '~/bundles/common/components/icon/enums/icon-size.enum.js';
import { Icon } from '~/bundles/common/components/icon/icon.js';

const meta: Meta<typeof Icon> = {
    component: Icon,
    title: 'Components/Icon',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

// eslint-disable-next-line no-restricted-syntax
export const ArrowSmall: Story = {
    args: {
        name: 'arrowDown',
        size: IconSize.SMALL,
    },
};
export const ArrowMedium: Story = {
    args: {
        name: 'arrowDown',
        size: IconSize.MEDIUM,
    },
};
export const ArrowLarge: Story = {
    args: {
        name: 'arrowDown',
        size: IconSize.LARGE,
    },
};
export const ArrowExtraLarge: Story = {
    args: {
        name: 'arrowDown',
        size: IconSize.EXTRA_LARGE,
    },
};
export const LogoSmallPrimary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.SMALL,
        color: IconColor.PRIMARY,
    },
};
export const LogoMediumPrimary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.MEDIUM,
        color: IconColor.PRIMARY,
    },
};
export const LogoLargePrimary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.LARGE,
        color: IconColor.PRIMARY,
    },
};
export const LogoExtraLargePrimary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.EXTRA_LARGE,
        color: IconColor.PRIMARY,
    },
};
export const LogoSmallSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.SMALL,
        color: IconColor.SECONDARY,
    },
};
export const LogoMediumSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.MEDIUM,
        color: IconColor.SECONDARY,
    },
};
export const LogoLargeSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.LARGE,
        color: IconColor.SECONDARY,
    },
};
export const LogoExtraLargeSecondary: Story = {
    args: {
        name: 'logoIcon',
        size: IconSize.EXTRA_LARGE,
        color: IconColor.SECONDARY,
    },
};
export const NotFoundSmallPrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.SMALL,
        color: IconColor.PRIMARY,
    },
};
export const NotFoundMediumPrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.MEDIUM,
        color: IconColor.PRIMARY,
    },
};
export const NotFoundLargePrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.LARGE,
        color: IconColor.PRIMARY,
    },
};
export const NotFoundExtraLargePrimary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.EXTRA_LARGE,
        color: IconColor.PRIMARY,
    },
};
export const NotFoundSmallSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.SMALL,
        color: IconColor.SECONDARY,
    },
};
export const NotFoundMediumSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.MEDIUM,
        color: IconColor.SECONDARY,
    },
};
export const NotFoundLargeSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.LARGE,
        color: IconColor.SECONDARY,
    },
};
export const NotFoundExtraLargeSecondary: Story = {
    args: {
        name: 'notFoundIcon',
        size: IconSize.EXTRA_LARGE,
        color: IconColor.SECONDARY,
    },
};
