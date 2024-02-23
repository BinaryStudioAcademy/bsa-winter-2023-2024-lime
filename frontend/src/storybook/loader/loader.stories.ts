import { type Meta, type StoryObj } from '@storybook/react';

import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { Loader } from '~/bundles/common/components/loader/loader.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const meta: Meta<typeof Loader> = {
    component: Loader,
    title: 'Components/Loader',
    args: {
        isOverflow: true,
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

const LoaderSmallPrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: ComponentSize.SMALL,
    },
};
const LoaderMediumPrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: ComponentSize.MEDIUM,
    },
};
const LoaderLargePrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: ComponentSize.LARGE,
    },
};
const LoaderExtraLargePrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: ComponentSize.EXTRA_LARGE,
    },
};
const LoaderSmallSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: ComponentSize.SMALL,
    },
};
const LoaderMediumSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: ComponentSize.MEDIUM,
    },
};
const LoaderLargeSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: ComponentSize.LARGE,
    },
};
const LoaderExtraLargeSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: ComponentSize.EXTRA_LARGE,
    },
};

export {
    LoaderExtraLargePrimary,
    LoaderExtraLargeSecondary,
    LoaderLargePrimary,
    LoaderLargeSecondary,
    LoaderMediumPrimary,
    LoaderMediumSecondary,
    LoaderSmallPrimary,
    LoaderSmallSecondary,
};
