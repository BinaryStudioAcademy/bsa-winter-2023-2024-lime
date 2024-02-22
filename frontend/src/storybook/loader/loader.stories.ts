import { type Meta, type StoryObj } from '@storybook/react';

import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { IconSize } from '~/bundles/common/components/icon/enums/icon-size.enum.js';
import { Loader } from '~/bundles/common/components/loader/loader.js';

const meta: Meta<typeof Loader> = {
    component: Loader,
    title: 'Components/Loader',
    args: {
        isOverflow: true,
    },
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Loader>;

const LoaderSmallPrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.SMALL,
    },
};
const LoaderMediumPrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.MEDIUM,
    },
};
const LoaderLargePrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.LARGE,
    },
};
const LoaderExtraLargePrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.EXTRA_LARGE,
    },
};
const LoaderSmallSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.SMALL,
    },
};
const LoaderMediumSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.MEDIUM,
    },
};
const LoaderLargeSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.LARGE,
    },
};
const LoaderExtraLargeSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.EXTRA_LARGE,
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
    meta,
};
