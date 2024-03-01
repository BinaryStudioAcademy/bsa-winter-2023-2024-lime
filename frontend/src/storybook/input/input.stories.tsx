import { type Meta, type StoryObj } from '@storybook/react';

import { InputStory } from './input-story.js';

const meta: Meta<typeof InputStory> = {
    component: InputStory,
    title: 'Components/Input',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputStory>;

const Sandbox: Story = {
    args: {
        label: 'Text',
        placeholder: 'placeholder',
        type: 'text',
    },
};

export { Sandbox };
