import { type Meta, type StoryObj } from '@storybook/react';

import { ActivityWidget } from '~/bundles/common/components/widgets/activity-widget/activity-widget.js';

const meta: Meta<typeof ActivityWidget> = {
    component: ActivityWidget,
    title: 'Components/ActivityWidget',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActivityWidget>;

const Sandbox: Story = {
    args: {
        label: 'Activity',
        value: 'Value',
        color: 'magenta',
        icon: 'Icon',
    },
};

export { Sandbox };
