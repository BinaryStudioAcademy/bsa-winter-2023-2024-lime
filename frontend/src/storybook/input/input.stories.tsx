/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-default-export */
import type { Meta, StoryObj } from '@storybook/react';

import { InputStory } from './input-story.js';

const meta: Meta<typeof InputStory> = {
    component: InputStory,
    title: 'Components/Input',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputStory>;

export const Text: Story = {
    args: {
        label: 'Text',
        placeholder: 'placeholder',
        name: 'text',
        type: 'text',
    },
};
export const Password: Story = {
    args: {
        label: 'Password',
        name: 'password',
        type: 'password',
    },
};
