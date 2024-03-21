import { type Meta, type StoryObj } from '@storybook/react';

import {
    Button,
    ButtonVariant,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Components/Button',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

const Sandbox: Story = {
    args: {
        size: ComponentSize.MEDIUM,
        variant: ButtonVariant.PRIMARY,
        label: 'Button',
    },
};

export { Sandbox };
