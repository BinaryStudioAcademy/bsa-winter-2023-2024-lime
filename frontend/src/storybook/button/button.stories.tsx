import { type Meta, type StoryObj } from '@storybook/react';

import {
    Button,
    ButtonVariant,
    Icon,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Components/Button',
    args: {
        label: 'Button',
    },
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof Button>;

const MediumPrimary: Story = {
    args: {
        size: ComponentSize.MEDIUM,
        variant: ButtonVariant.PRIMARY,
    },
};
const MediumPrimaryDisabled: Story = {
    args: {
        size: ComponentSize.MEDIUM,
        variant: ButtonVariant.PRIMARY,
        isDisabled: true,
    },
};
const MediumSecondary: Story = {
    args: {
        size: ComponentSize.MEDIUM,
        variant: ButtonVariant.SECONDARY,
    },
};
const MediumSecondaryDisabled: Story = {
    args: {
        size: ComponentSize.MEDIUM,
        variant: ButtonVariant.SECONDARY,
        isDisabled: true,
    },
};
const MediumTertiary: Story = {
    args: {
        size: ComponentSize.MEDIUM,
        variant: ButtonVariant.TERTIARY,
    },
};
const MediumTertiaryDisabled: Story = {
    args: {
        size: ComponentSize.MEDIUM,
        variant: ButtonVariant.TERTIARY,
        isDisabled: true,
    },
};
const SmallPrimary: Story = {
    args: {
        size: ComponentSize.SMALL,
        variant: ButtonVariant.PRIMARY,
    },
};
const SmallSecondary: Story = {
    args: {
        size: ComponentSize.SMALL,
        variant: ButtonVariant.SECONDARY,
    },
};
const SmallTertiary: Story = {
    args: {
        size: ComponentSize.SMALL,
        variant: ButtonVariant.TERTIARY,
    },
};
const ButtonWithIcon: Story = {
    render: () => (
        <Button
            rightIcon={<Icon name={'logoIcon'} size="md" />}
            size={ComponentSize.MEDIUM}
            variant={ButtonVariant.PRIMARY}
            label=""
        />
    ),
};

export {
    ButtonWithIcon,
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
