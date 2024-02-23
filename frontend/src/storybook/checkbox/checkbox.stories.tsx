import { type Meta, type StoryObj } from '@storybook/react';

import { CheckboxStory } from './checkbox-story.js';

const meta: Meta<typeof CheckboxStory> = {
    component: CheckboxStory,
    title: 'Components/Checkbox',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxStory>;

const Checkbox: Story = {
    args: {
        label: 'Checkbox',
    },
};

export { Checkbox };
