import { type Meta, type StoryObj } from '@storybook/react';

import { CheckboxStory } from './checkbox-story.js';

const meta: Meta<typeof CheckboxStory> = {
    component: CheckboxStory,
    title: 'Components/Checkbox',
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof CheckboxStory>;

// eslint-disable-next-line no-restricted-syntax

const Checkbox: Story = {
    args: {
        label: 'Checkbox',
    },
};

export { Checkbox };
