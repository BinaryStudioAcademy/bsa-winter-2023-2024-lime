/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import {
    Button,
    ButtonSize,
    ButtonVariant,
} from '~/bundles/common/components/components.js';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Components/Button',
    args: {
        className: 'w-[375px]',
        label: 'Button',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const MediumPrimary: Story = {
    args: {
        size: ButtonSize.MEDIUM,
        variant: ButtonVariant.PRIMARY,
    },
};
export const MediumPrimaryDisabled: Story = {
    args: {
        size: ButtonSize.MEDIUM,
        variant: ButtonVariant.PRIMARY,
        isDisabled: true,
    },
};
export const MediumSecondary: Story = {
    args: {
        size: ButtonSize.MEDIUM,
        variant: ButtonVariant.SECONDARY,
    },
};
export const MediumSecondaryDisabled: Story = {
    args: {
        size: ButtonSize.MEDIUM,
        variant: ButtonVariant.SECONDARY,
        isDisabled: true,
    },
};
export const MediumTertiary: Story = {
    args: {
        size: ButtonSize.MEDIUM,
        variant: ButtonVariant.TERTIARY,
    },
};
export const MediumTertiaryDisabled: Story = {
    args: {
        size: ButtonSize.MEDIUM,
        variant: ButtonVariant.TERTIARY,
        isDisabled: true,
    },
};
export const SmallPrimary: Story = {
    args: {
        size: ButtonSize.SMALL,
        variant: ButtonVariant.PRIMARY,
    },
};
export const SmallSecondary: Story = {
    args: {
        size: ButtonSize.SMALL,
        variant: ButtonVariant.SECONDARY,
    },
};
export const SmallTertiary: Story = {
    args: {
        size: ButtonSize.SMALL,
        variant: ButtonVariant.TERTIARY,
    },
};
