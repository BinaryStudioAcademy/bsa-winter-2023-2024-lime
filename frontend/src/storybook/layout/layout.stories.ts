/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import { Layout } from '~/bundles/common/components/layout/layout.js';

const meta: Meta<typeof Layout> = {
    component: Layout,
    title: 'Components/Layout',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Layout>;

// eslint-disable-next-line no-restricted-syntax
export const LayoutStory: Story = {
    args: { children: 'Hello World', className: 'text-lm-yellow-100' },
};
