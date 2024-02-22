/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-default-export */
import { type Meta, type StoryObj } from '@storybook/react';

import { CheckboxStory } from './checkbox-story.js';

const meta: Meta<typeof CheckboxStory> = {
    component: CheckboxStory,
    title: 'Components/Checkbox',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxStory>;

// eslint-disable-next-line no-restricted-syntax

export const Checkbox: Story = {
    args: {
        label: 'Checkbox',
    },
};
