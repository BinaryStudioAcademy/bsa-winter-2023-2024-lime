import { type Meta, type StoryObj } from '@storybook/react';

import { Icon } from '~/bundles/common/components/icon/icon.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const meta: Meta<typeof Icon> = {
    component: Icon,
    title: 'Components/Icon',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

const Sandbox: Story = {
    args: {
        name: 'arrowDown',
        size: ComponentSize.SMALL,
    },
};

export { Sandbox };
