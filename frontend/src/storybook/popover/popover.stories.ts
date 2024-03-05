import { type Meta, type StoryObj } from '@storybook/react';

import { Popover } from '~/bundles/common/components/popover/popover.js';

const meta: Meta<typeof Popover> = {
    component: Popover,
    title: 'Components/Popover',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

const Sandbox: Story = {
    args: {
        classNameContentWrapper: 'w-80 bg-lm-magenta p-5',
        children: 'Click me',
        content: 'Hello World',
        className: 'bg-lm-yellow-100 w-80 p-3',
    },
};

export { Sandbox };
