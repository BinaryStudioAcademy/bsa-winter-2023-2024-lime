import { type Meta, type StoryObj } from '@storybook/react';

import {
    Button,
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

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof Button>;

const MediumPrimary: Story = {
    args: {
        size: 'medium',
        variant: ButtonVariant.PRIMARY,
    },
};
const MediumPrimaryDisabled: Story = {
    args: {
        size: 'medium',
        variant: ButtonVariant.PRIMARY,
        isDisabled: true,
    },
};
const MediumSecondary: Story = {
    args: {
        size: 'medium',
        variant: ButtonVariant.SECONDARY,
    },
};
const MediumSecondaryDisabled: Story = {
    args: {
        size: 'medium',
        variant: ButtonVariant.SECONDARY,
        isDisabled: true,
    },
};
const MediumTertiary: Story = {
    args: {
        size: 'medium',
        variant: ButtonVariant.TERTIARY,
    },
};
const MediumTertiaryDisabled: Story = {
    args: {
        size: 'medium',
        variant: ButtonVariant.TERTIARY,
        isDisabled: true,
    },
};
const SmallPrimary: Story = {
    args: {
        size: 'small',
        variant: ButtonVariant.PRIMARY,
    },
};
const SmallSecondary: Story = {
    args: {
        size: 'small',
        variant: ButtonVariant.SECONDARY,
    },
};
const SmallTertiary: Story = {
    args: {
        size: 'small',
        variant: ButtonVariant.TERTIARY,
    },
};

export {
    MediumPrimary,
    MediumPrimaryDisabled,
    MediumSecondary,
    MediumSecondaryDisabled,
    MediumTertiary,
    MediumTertiaryDisabled,
    SmallPrimary,
    SmallSecondary,
    SmallTertiary,
};
