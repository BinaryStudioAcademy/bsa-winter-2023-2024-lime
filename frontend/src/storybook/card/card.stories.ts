import { type Meta, type StoryObj } from '@storybook/react';

import { Card } from '~/bundles/common/components/card/card.js';

const meta: Meta<typeof Card> = {
    component: Card,
    title: 'Components/Card',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

const Sandbox: Story = {
    args: {
        name: 'Name',
        title: 'Title',
        chip: 'Chip',
        data: 'Data',
    },
};

export { Sandbox };
