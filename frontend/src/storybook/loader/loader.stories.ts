/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable import/no-default-export */
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

export default meta;
type Story = StoryObj<typeof Loader>;

// eslint-disable-next-line no-restricted-syntax
export const LoaderSmallPrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.SMALL,
    },
};
export const LoaderMediumPrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.MEDIUM,
    },
};
export const LoaderLargePrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.LARGE,
    },
};
export const LoaderExtraLargePrimary: Story = {
    args: {
        color: IconColor.PRIMARY,
        size: IconSize.EXTRA_LARGE,
    },
};
export const LoaderSmallSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.SMALL,
    },
};
export const LoaderMediumSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.MEDIUM,
    },
};
export const LoaderLargeSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.LARGE,
    },
};
export const LoaderExtraLargeSecondary: Story = {
    args: {
        color: IconColor.SECONDARY,
        size: IconSize.EXTRA_LARGE,
    },
};
