import { type Meta, type StoryObj } from '@storybook/react';

import { InputStory } from './input-story.js';

const meta: Meta<typeof InputStory> = {
    component: InputStory,
    title: 'Components/Input',
    tags: ['autodocs'],
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof InputStory>;

const Text: Story = {
    args: {
        label: 'Text',
        placeholder: 'placeholder',
        name: 'text',
        type: 'text',
    },
};
const Password: Story = {
    args: {
        label: 'Password',
        name: 'password',
        type: 'password',
    },
};

export { Password, Text };
