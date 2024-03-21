import { type Meta, type StoryObj } from '@storybook/react';

import { ActivityIcon } from '~/bundles/common/components/activity-icon/activity-icon.js';

const meta: Meta<typeof ActivityIcon> = {
    component: ActivityIcon,
    title: 'Components/ActivityIcon',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActivityIcon>;

const Sandbox: Story = {
    args: {
        activityType: 'cycling',
        size: 'lg',
    },
};

export { Sandbox };
