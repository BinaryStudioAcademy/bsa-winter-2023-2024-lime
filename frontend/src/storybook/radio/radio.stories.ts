import { type Meta, type StoryObj } from '@storybook/react';

import { RadioStory } from './radio-story.js';

const meta: Meta<typeof RadioStory> = {
    component: RadioStory,
    title: 'Components/Radio',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioStory>;

const Sandbox: Story = {
    args: {
        label: 'Radio',
        value: 'radio',
        type: 'round',
    },
};

export { Sandbox };
